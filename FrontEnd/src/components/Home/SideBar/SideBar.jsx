// import SkeletonUserItem from '../../Layouts/SkeletonUserItem';
// import UserListItem from './UserListItem';

const Sidebar = () => {

    return (
        <div className="fixed lg:right-32 xl:right-56 w-3/12 h-full hidden lg:flex flex-col flex-auto m-8 mt-12 pr-8 -z-1">

            <div className="ml-10 flex flex-col p-2">

                <div className="flex justify-between items-center">
                    {/*<div className="flex flex-auto space-x-4 items-center">*/}
                    {/*    <Link to={`/${user.username}`}><img draggable="false" className="w-14 h-14 rounded-full object-cover" src={user.avatar} alt={user.name} /></Link>*/}
                    {/*    <div className="flex flex-col">*/}
                    {/*        <Link to={`/${user.username}`} className="text-black text-sm font-semibold">{user.username}</Link>*/}
                    {/*        <span className="text-gray-400 text-sm">{user.name}</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <span className="text-blue-500 text-xs font-semibold cursor-pointer">Switch</span>
                </div>

               <div className="flex justify-between items-center mt-5">
                    <p className="font-semibold text-gray-500 text-sm">Suggestions For You</p>
                    <span className="text-black text-xs font-semibold cursor-pointer">See All</span>
                </div>

                <div className="flex flex-col flex-auto mt-3 space-y-3.5">

                    {/*{loading ?*/}
                    {/*    Array(5).fill("").map((el, i) => (<SkeletonUserItem key={i} />))*/}
                    {/*    :*/}
                    {/*    users?.map((user) => (*/}
                    {/*        <UserListItem {...user} key={user._id} />*/}
                    {/*    ))*/}
                    {/*}*/}
                </div>

                {/* <!-- sidebar footer container--> */}
                <div className="flex flex-col mt-8 space-y-6 text-xs text-gray-400">
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-1.5">
                            {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations'].map((el, i) => (
                                <a href="#" key={i}>{el}</a>
                            ))}
                        </div>
                        <div className="flex items-center space-x-1.5">
                            {['Top Accounts', 'Hashtags', 'Language'].map((el, i) => (
                                <a href="#" key={i}>{el}</a>
                            ))}
                        </div>
                    </div>
                    <span>&copy; {new Date().getFullYear()} INSTAGRAM FROM META</span>
                </div>

            </div>
        </div >
    )
}

export default Sidebar