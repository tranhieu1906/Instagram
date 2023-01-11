// import PostsContainer from './PostsContainer'
import SideBar from './SideBar/SideBar'
import MetaData from '../Layouts/MetaData';
import { useEffect } from 'react';
import axios from '../../api/axios';

const Home = () => {
     useEffect(() => {    
       axios.get("/api/v1/users");
     }, []);
    return (
        <>
            <MetaData title="Instagram" />

            <div className="flex h-full md:w-4/5 lg:w-4/6 mt-14 mx-auto">
                <h1>Home Page</h1>
                {/*<PostsContainer />*/}
                <SideBar />
            </div>
        </>
    )
}

export default Home