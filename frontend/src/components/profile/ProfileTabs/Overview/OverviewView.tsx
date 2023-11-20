import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
const OverviewView = ()=>{

    return (
        <>
            
            <motion.div layout>
            <div id="OverviewView" className="">
                <h1>Hello im OverviewView</h1>
            </div>
            </motion.div>
        </>
    )
}
export default OverviewView