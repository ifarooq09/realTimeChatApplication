import NewIm from "./new-im/NewIm";
import ProfileInfo from "./profile-info/profileInfo";

/* eslint-disable react/prop-types */
const ContactsContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
      <div className="pt-16">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Instant Messages" />
          <NewIm />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Groups" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="absolute top-0 left-0 flex p-4 items-center gap-2">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        viewBox="0 0 32 32"
        style={{ enableBackground: "new 0 0 32 32" }}
        xmlSpace="preserve"
        className="w-8 h-8"
      >
        <path
          style={{ fill: "#eab308" }}
          d="M29 23c-.125 0-.251-.023-.372-.071-1.829-.732-3.596-1.908-5.251-3.494a1 1 0 1 1 1.385-1.443c.814.78 1.654 1.447 2.512 1.994a34.804 34.804 0 0 1-.888-3.81 1.001 1.001 0 0 1 .313-.911C28.183 13.92 29 12.229 29 10.5 29 6.364 24.514 3 19 3S9 6.364 9 10.5c0 .122.004.242.012.362a1 1 0 0 1-.933 1.063c-.557.016-1.027-.382-1.063-.933A7.284 7.284 0 0 1 7 10.5C7 5.262 12.383 1 19 1s12 4.262 12 9.5c0 2.13-.901 4.19-2.549 5.856.564 2.957 1.469 5.25 1.478 5.273a.998.998 0 0 1-.223 1.078A.998.998 0 0 1 29 23z"
        />
        <path
          style={{ fill: "#eab308" }}
          d="M3 31a1 1 0 0 1-.93-1.37c.01-.023.914-2.316 1.478-5.273C1.901 22.689 1 20.63 1 18.5 1 13.262 6.383 9 13 9s12 4.262 12 9.5S19.617 28 13 28c-1.478 0-2.922-.214-4.305-.636-1.677 1.623-3.465 2.821-5.324 3.564A.98.98 0 0 1 3 31zm10-20c-5.514 0-10 3.364-10 7.5 0 1.728.817 3.42 2.301 4.765.253.23.372.573.313.911a34.651 34.651 0 0 1-.888 3.811c1.024-.653 2.021-1.477 2.983-2.462a1 1 0 0 1 1.05-.244c1.348.477 2.775.719 4.241.719 5.514 0 10-3.364 10-7.5S18.514 11 13 11z"
        />
        <path
          style={{ fill: "#eab308" }}
          d="M6 19.5a1 1 0 0 1-1-1c0-2.656 3.215-5.5 8-5.5a1 1 0 1 1 0 2c-3.663 0-6 2.073-6 3.5a1 1 0 0 1-1 1z"
        />
      </svg>
      <span className="text-3xl font-semibold">SyncChat</span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm playpen-sans">
      {text}
    </h6>
  );
};
