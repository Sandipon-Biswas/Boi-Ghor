import { useContext } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser } = context;
    return (
        <div>
            <div>
                <div className="py-5 flex justify-between items-center">
                    <h1 className=" text-xl text-cyan-900 font-bold">All Users</h1>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-cyan-900 text-cyan-900">
                        <tbody>
                            <tr>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900 font-bold fontPara">S.No.</th>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900 font-bold fontPara">Name</th>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900 font-bold fontPara">Email</th>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900 font-bold fontPara">UID</th>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900 font-bold fontPara">Role</th>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-cyan-900 text-white bg-cyan-900 font-bold fontPara">Date</th>
                            </tr>
                            {
                                getAllUser.map((value, index) => {
                                    return (
                                        <tr key={index} className="text-white">
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white">{index + 1}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white first-letter:uppercase">{value.name}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white cursor-pointer">{value.email}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white cursor-pointer">{value.uid}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white cursor-pointer">{value.role}</td>
                                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-cyan-900 text-white cursor-pointer">{value.date}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
