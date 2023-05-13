import Layout from "@/components/layout/layout"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

const Homepage = () => {
    //const [currentAccount, setCurrentAccount] = useState(null);

    let currentAccount = useSelector((state) => state.currentAccount);
    console.log(currentAccount)
    

    return (
        <Layout>
            <div className="text-white">
                sdjnsnjdsjndjnsdjnsjndsjndjnsjndsjndsjndjnsdjnsjndsjndjnsjndsjndsnjdnjsnjdsnjdsnjdsjndjnsdnjsnjdsnjdsnjdsnj{currentAccount}
                
            </div>
        </Layout>
            
    )
}

export default Homepage