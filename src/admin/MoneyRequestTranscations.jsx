import React from "react";
import Topbar from "../components/Topbar";

export default function MoneyRequestTranscations() {
  return (
    <>
      <Topbar title={"Money Request Transcations"} hideicon={"hidden"} />
      <div>
        <div className="w-full overflow-x-auto mb-14">
          <table className="w-full text-sm text-center it text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>

                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
              </tr>
            </thead>
            {/* {notificationListMap} */}

            {/* {Userlist} */}
            {/* {user} */}
          </table>
        </div>
      </div>
    </>
  );
}
