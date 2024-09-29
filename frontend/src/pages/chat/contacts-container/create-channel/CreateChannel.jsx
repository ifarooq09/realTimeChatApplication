import {
  TooltipProvider,
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiService } from "@/lib/apiService";
import { CREATE_GROUP_ROUTES, GET_ALL_CONTACTS } from "@/utils/constants";
import { userAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData, addGroup } = userAppStore();
  const [newGroupModal, setNewGroupModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacs] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await apiService.get(GET_ALL_CONTACTS, {
        withCredentials: true,
      });
      setAllContacts(response.data.contacts);
    };

    getData();
  }, []);

  const createGroup = async () => {
    try {
        if (groupName.length > 0 && selectedContacts.length > 0) {
            const response = await apiService.post(
                CREATE_GROUP_ROUTES,
                {
                    name: groupName,
                    members: selectedContacts.map((contact) => contact.value)
                },
                { withCredentials: true }
            )

            if (response.status === 201) {
                setGroupName("");
                setSelectedContacs([]);
                setNewGroupModal(false)
                addGroup(response.data.group)
            } 
        }
    } catch (error) {
        console.log(error)
    }
  };


  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-yellow-500 font-light text-opacity-90 text-start hover:text-yellow-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewGroupModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[@1c1b1e] border-none mb-2 p-3 text-white">
            <p>Create New Group</p>
          </TooltipContent>
        </Tooltip> 
      </TooltipProvider>
      <Dialog open={newGroupModal} onOpenChange={setNewGroupModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please fill up the details for new Group</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Group Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
            />
          </div>
          <div>
            <MultipleSelector 
                className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
                defaultOptions={allContacts}
                placeholder="Search Contacts"
                value={selectedContacts}
                onChange={setSelectedContacs}
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600">No results found</p>
                }
            />
          </div>
          <div>
            <Button className="w-full bg-yellow-500 hover:bg-yellow-900 transition-all duration-300"
            onClick={createGroup}
            >
              Create Group
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
