import { motion } from "framer-motion";
import left1 from "../../assets/left1.png";
import right1 from "../../assets/right1.png";
import right2 from "../../assets/right2.png";

const LearnAnimatedImg = () => {

    const ArrayData = [
        {
            img: right1,
            heading: "Invite friends in a few taps",
            dis: "Set up a group ride and invite your friends to join. The Uber app will create a text you can easily share."

        },
        {
            img: left1,
            heading: "Arrive at your destination together",
            dis: "Each person you invite will add their pickup or dropoff spot, and your driver will pick them up along the way to your destination."
        },
        {
            img: right2,
            heading: "Save as a group",
            dis: "After starting your ride, your group can split the price equally—so in addition to arriving together, you’ll spend less than you would on individual rides. Each rider could save 30% on average by sharing a ride instead of requesting their own.*"
        }
    ]

    return (
        <div>
            <div>
                {
                    ArrayData.map((item, index) => {
                        return (
                            <div className={`text-white flex items-center ${index % 2 != 0 ? "flex-row-reverse " : "flex-row"}`}>
                                <div className={`w-1/2 flex flex-col gap-5 ${index % 2 != 0 ? "pl-29" : "pr-29 "} `}>
                                    <div className={`text-4xl font-semibold`}>
                                        {item.heading}
                                    </div>
                                    <div>
                                        {item.dis}
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <motion.img 
                                    className="object-cover" 
                                    src={item.img}
                                    initial={{x:index % 2 != 0 ? -100 : 100, opacity:0}}
                                    whileInView={{x:0, opacity:1}}
                                    viewport={{once:true, amount:0.3}}
                                    transition={{duration:0.6, ease:"easeOut"}}
                                     />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default LearnAnimatedImg;
