import React, { useState } from "react";
import { Text, View, TouchableOpacity } from 'react-native';

export default function HeaderTab(){
    const [activeTab, setActiveTab] = useState("Delivery");
    return(
        <View style={{flexDirection: "row", alignSelf: "center"}}>
            <HeaderButton 
                text="Deliver" 
                btnColor="black" 
                textColor="white"
                activeTab={activeTab}
                setActiveTab={setActiveTab}/>
            <HeaderButton 
                text="Pick Up"
                btnColor="white"
                textColor="black"
                activeTab={activeTab}
                setActiveTab={setActiveTab}/>
        </View>
    );
}

const HeaderButton = (props) => (
    <View>
        <TouchableOpacity 
            style = {{
                backgroundColor: props.activeTab === props.text ? "black":"white",
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 30,
            }}
            onPress={() => props.setActiveTab(props.text)}>

            <Text style={{
                color: props.activeTab === props.text ? "white":"black",
                fontSize: 15,
                fontWeight: "900",
                }}>{props.text}
            </Text>
        </TouchableOpacity>
    </View>
    
);