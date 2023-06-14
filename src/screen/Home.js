import { useEffect, useState } from "react";
import { Wrappers, themeObj } from "../components/elements";
import { Image, Text, View, ScrollView, Button } from "react-native";
import SplashScreen from 'react-native-splash-screen';
import { styled } from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import logo from '../assets/images/logo.webp'
import testFood from '../assets/images/playstore.png'
import { TouchableOpacity } from "react-native-gesture-handler";
const SideBarContainer = styled.View`
background:${themeObj.color.background1};
flex-direction:column;
`
const MenuContainer = styled.ScrollView`
margin-bottom:12px;
`
const Container = styled.View`
background:#fff;
margin:2.5%;
background:red;
`
const Menu = styled.TouchableOpacity`
cursor:pointer;
color: #fff;
margin:4px 0;
`
const MenuText = styled.View`
padding:6px;
border-top-left-radius: 8px;
border-bottom-left-radius: 8px;
margin-left:15px;
`
const Header = styled.View`

`
const test_data = {
    menus: [
        {
            name: '안주', children: [
                { name: '안주 플래터' },
                { name: '안주' },
            ]
        },
        {
            name: '꼬치', children: [
                { name: '모둠 & 야채 꼬지' },
            ]
        },
        {
            name: '프라이드 치킨', children: []
        },
        {
            name: '전', children: []
        },
        {
            name: '밥&면', children: [
                { name: '밥' },
                { name: '면' },
            ]
        },
        {
            name: '디저트', children: []
        },
        {
            name: '음료', children: [
                { name: '탄산음료' },
                { name: '주스 & 물' },
                { name: '커피' },
                { name: '차' },
            ]
        },
        {
            name: '주류', children: [
                { name: '맥주' },
                { name: '소주' },
                { name: '막걸리' },
                { name: '칵테일' },
                { name: '글라스 와인' },
                { name: '바틀 와인' },
            ]
        },
    ],
    call_staff: [
        { name: '냅킨' },
        { name: '물티슈' },
        { name: '물 리필' },
        { name: '없음' },
        { name: '기본안주 리필' },
        { name: '적가락' },
        { name: '앞접시' },
        { name: '국그릇' },
        { name: '이쑤시개' },
        { name: '유아 식기' },
        { name: '담요' },
        { name: '핸드폰 충전' },
        { name: '테이블 정리' },
        { name: '포장' },
        { name: '결제' },
    ]
}
const Home = (props) => {

    const [selectMenu, setSelectMenu] = useState("");
    useEffect(() => {
        SplashScreen.hide();
    }, [])
    return (
        <>
            <Wrappers>
                <SideBarContainer style={{
                    width: wp('18%')
                }}>
                    <Image source={logo} style={StyleSheet.logo_img} />
                    <MenuContainer>
                        {test_data.menus.map((item, idx) => (
                            <>
                                <Menu key={idx} onPress={() => {
                                    setSelectMenu(item.name)
                                }}>
                                    <MenuText style={{
                                        backgroundColor: `${item.name == selectMenu ? '#fff' : themeObj.color.background1}`,
                                        borderBottomRightRadius: (idx < test_data.menus.length - 1 ? (test_data.menus[idx + 1]?.name == selectMenu ? 8 : 0) : 0),
                                        borderTopRightRadius: (idx > 0 ? (test_data.menus[idx - 1]?.name == selectMenu ? 8 : 0) : 0)
                                    }}>
                                        <Text style={{
                                            color: `${item.name == selectMenu ? themeObj.color.background1 : '#fff'}`,
                                            fontWeight: `${item.name == selectMenu ? 'bold' : '400'}`
                                        }}>{item.name}</Text>
                                    </MenuText>
                                </Menu>
                            </>
                        ))}
                    </MenuContainer>
                    <TouchableOpacity
                        style={{
                            ...StyleSheet.call_staff_button
                        }}
                        onPress={() => {

                        }}
                    >
                        <Text style={{
                            color: themeObj.color.background1,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>직원 호출</Text>
                    </TouchableOpacity>
                </SideBarContainer>
                <View style={StyleSheet.container}>
                    <Container>
                        <Text>asd</Text>
                    </Container>
                </View>
            </Wrappers>
        </>
    )
}
const StyleSheet = {
    logo_img: {
        width: '60%',
        height: 30,
        margin: 15
    },
    container: {
        width: wp('82%'),
        backgroundColor: '#fff',
    },
    call_staff_button: {
        backgroundColor: '#fff',
        margin: 8,
        width: '80%',
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 6
    }
}
export default Home;