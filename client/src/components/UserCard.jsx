import React from "react";

const UserCard = ({ user }) => {
  console.log(user);

  return (
    <div className="w-[15vw] cursor-pointer hover:scale-105 transition-all h-fit border border-blue-400 rounded-lg shadow-md p-5">
      <div className="flex flex-col text-center items-center">
        {/* Profile Photo */}
        <img
          src={user.profilePhoto} // Replace with actual user image URL
          alt="User Profile"
          className="w-20 h-20 rounded-full border-2 border-gray-300"
        />
        {/* User Details */}
        <div>
          <h2 className="text-lg font-semibold">@{user.username}</h2>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-sm font-medium">Following</p>
              <p className="text-lg text-gray-100">
                {user.following.length}
              </p>{" "}
              {/* Replace with dynamic data */}
            </div>
            <div>
              <p className="text-sm font-medium">Followers</p>
              <p className="text-lg text-gray-100">
                {user.followers.length}
              </p>{" "}
              {/* Replace with dynamic data */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
