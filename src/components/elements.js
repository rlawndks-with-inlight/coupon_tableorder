import styled from "styled-components/native";
import { Dimensions, Text, View, ScrollView, Image, } from 'react-native';
const { width, height } = Dimensions.get('window');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Fontisto';
import { TouchableOpacity } from "react-native-gesture-handler";
import { test_call_staff_items } from "../data/test-data";
import { useEffect, useRef, useState } from "react";
import _ from 'lodash';
TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {};
TouchableOpacity.defaultProps.delayPressIn = 0;
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

export const Wrappers = styled.View`
flex:1;
flex-direction:${width < 500 ? 'column' : 'row'};
background-color:${props => props.backgroundColor};
position: relative;
`

export const Col = styled.View`
flex-direction: column;
`

export const themeObj = {
    color: {
        background1: '#b93459',
    },
    font: {
        size1: 32,
        size2: 26,
        size3: 19,
        size4: 17,
        size5: 15,
        size6: 13,
    },
    borderRadius: 8
}
const greyBorderStyle = {
    borderColor: `#ababab`,
    borderWidth: 1,
    borderRadius: themeObj.borderRadius
}
const ModalContainer = styled.View`
position: absolute; 
z-index: 99;
top: 0;
left: 0;
`
const CallStaffItem = (props) => {
    const { item, theme, onPressIn, selectCallList } = props;
    return (
        <>
            <TouchableOpacity style={{
                ...greyBorderStyle,
                width: wp('11.75%'),
                height: wp('14.4%'),
                marginRight: wp('2%'),
                marginBottom: wp('2%'),
                justifyContent: 'center',
                borderColor: `${_.findIndex(selectCallList, item) >= 0 ? theme.main_color : '#ababab'}`
            }}
                delayPressIn={0} onPressIn={() => {
                    onPressIn(item)
                }}
            >
                <Text style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: `${_.findIndex(selectCallList, item) >= 0 ? theme.main_color : theme.font_color}`,
                    fontSize: themeObj.font.size3
                }}>{item.name}</Text>
            </TouchableOpacity>
        </>
    )
}
const CallStaffOrderItem = (props) => {
    const { item, theme, onCallStaffOrderCal } = props;
    const carculButton = {
        backgroundColor: `#ababab`,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: themeObj.borderRadius
    }
    return (
        <>
            <View style={{
                flexDirection: 'column',
                paddingBottom: 16,
                paddingTop: 8,
                borderBottomColor: '#ababab',
                borderBottomWidth: 1
            }}>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 16
                }}>
                    <Text style={{
                        fontSize: themeObj.font.size3,
                        color: theme.font_color,
                    }}>{item?.name.replaceAll('\n', ' ')}</Text>
                    <TouchableOpacity style={{
                        borderColor: theme.font_color,
                        borderWidth: 1,
                        paddingTop: 1,
                        paddingBottom: 1,
                        paddingLeft: 3,
                        paddingRight: 3,
                        borderRadius: 4
                    }}
                        delayPressIn={0} onPressIn={() => {
                            onCallStaffOrderCal(item, 0)
                        }}>
                        <Text style={{
                            color: theme.font_color,
                        }}>삭제</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={carculButton}
                        delayPressIn={0} onPressIn={() => {
                            onCallStaffOrderCal(item, item?.count - 1)
                        }}>
                        <Icon name="minus-a" size={20} color={theme.background_color} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: themeObj.font.size3,
                        color: theme.font_color
                    }}>{item.count}개</Text>
                    <TouchableOpacity style={carculButton}
                        delayPressIn={0} onPressIn={() => {
                            onCallStaffOrderCal(item, item?.count + 1)
                        }}>
                        <Icon name="plus-a" size={20} color={theme.background_color} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
export const CallStaffModal = (props) => {
    const { data, open, handleClose, theme, styles } = props;

    const callStaffOrderItem = useRef();
    const [selectCallList, setSelectCallList] = useState([]);
    useEffect(() => {
        if (!open) {
            setSelectCallList([]);
        }
    }, [open])
    const onClickCallMenu = (item) => {
        let select_call_list = [...selectCallList];
        let find_item_idx = _.findIndex(select_call_list, item);
        let find_item = _.find(select_call_list, item);

        if (find_item_idx >= 0) {
            select_call_list.splice(find_item_idx, 1);
        } else {
            select_call_list.push({ ...item, count: 1 });
            callStaffOrderItem.current?.scrollTo({ y: 100000, animation: false })
        }
        setSelectCallList(select_call_list);
    }
    const onCallStaffOrderCal = (item, num) => {
        let select_call_list = [...selectCallList];
        let find_item_idx = _.findIndex(select_call_list, item);
        if (num == 0) {
            select_call_list.splice(find_item_idx, 1);
        } else {
            select_call_list[find_item_idx].count = num;
        }
        setSelectCallList(select_call_list)
    }
    return (
        <>
            {open ?
                <>
                    <ModalContainer style={{
                        width: wp('100%'),
                        flex: 1,
                        height: hp('109%'),
                        backgroundColor: theme?.background_color
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingLeft: wp('2.5%'),
                            paddingTop: wp('2.5%'),
                            paddingRight: wp('2.5%'),
                            paddingBottom: wp('1.25%'),
                            justifyContent: 'space-between',
                            borderBottomColor: `#ababab`,
                            borderBottomWidth: 1,
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: theme.font_color,
                                    fontSize: themeObj.font.size1
                                }}>직원호출 메뉴</Text>
                                <Text style={{
                                    fontSize: themeObj.font.size4,
                                    marginLeft: 8
                                }}>항목을 선택해주세요.</Text>
                            </View>
                            <TouchableOpacity style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                                delayPressIn={0} onPressIn={handleClose}
                            >
                                <Text style={{
                                    color: theme.font_color,
                                    fontSize: themeObj.font.size1, marginRight: 4
                                }}>닫기</Text>
                                <Icon name="close-a" size={30} color={theme.font_color} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: wp('2.5%'),
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <ScrollView showsVerticalScrollIndicator={false} >
                                <View style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap'
                                }}>
                                    {test_call_staff_items.map((item, idx) => (
                                        <>
                                            <CallStaffItem item={item} theme={theme} delayPressIn={0} onPressIn={onClickCallMenu} selectCallList={selectCallList} />
                                        </>
                                    ))}
                                </View>
                            </ScrollView>
                            <View style={{
                                ...greyBorderStyle,
                                width: wp('26%'),
                            }}>
                                <ScrollView style={{
                                    width: '90%',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: 8
                                }} showsVerticalScrollIndicator={false} ref={callStaffOrderItem}>
                                    {selectCallList.map((item, idx) => (
                                        <>
                                            <CallStaffOrderItem
                                                item={item}
                                                theme={theme}
                                                onCallStaffOrderCal={onCallStaffOrderCal}
                                            />
                                        </>
                                    ))}

                                </ScrollView>
                                <TouchableOpacity
                                    style={{
                                        ...styles.color_button,
                                        width: '90%',
                                        backgroundColor: theme.main_color,
                                        marginRight: 0,
                                        marginBottom: 12,
                                    }}
                                    delayPressIn={0} onPressIn={() => {

                                    }}
                                >
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize: themeObj.font.size4
                                    }}>{selectCallList.length > 0 ? '요청하기' : '호출'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalContainer>
                </>
                :
                <>
                </>}
        </>
    )
}
export const ItemDetailModal = (props) => {
    const { item, open, handleClose, theme, styles } = props;

    return (
        <>
            {open ?
                <>
                    <View style={{
                        position: 'absolute',
                        backgroundColor: 'red',
                        top: 0,
                        width: wp('100%'),
                        height: hp('109%'),
                    }} />
                    <ModalContainer style={{
                        width: wp('97%'),
                        flex: 1,
                        height: hp('100%'),
                        backgroundColor: theme?.background_color,
                        left: wp('1.5%'),
                        top: wp('4%'),
                        borderRadius: themeObj.borderRadius
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingLeft: wp('2.5%'),
                            paddingTop: wp('2.5%'),
                            paddingRight: wp('2.5%'),
                            paddingBottom: wp('1.25%'),
                            justifyContent: 'space-between',
                            borderBottomColor: `#ababab`,
                            borderBottomWidth: 1,
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }} />
                            <TouchableOpacity style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                                delayPressIn={0} onPressIn={handleClose}
                            >
                                <Text style={{
                                    color: theme.font_color,
                                    fontSize: themeObj.font.size1, marginRight: 4
                                }}>닫기</Text>
                                <Icon name="close-a" size={30} color={theme.font_color} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: wp('2.5%'),
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <Image
                                source={item?.product_img}
                                style={{ width: wp('48.9%'), height: wp('35.8%'), borderRadius: themeObj.borderRadius }}
                            />
                            <View style={{
                                width: wp('38%'),
                                marginLeft: 'auto',
                                flexDirection: 'column',
                                display:'flex'
                            }}>
                                <Text style={{
                                    color: theme.font_color,
                                    fontSize: themeObj.font.size1
                                }}>{item?.product_name}</Text>
                                <Text style={{
                                    color: theme.font_color,
                                    fontSize: themeObj.font.size3,
                                    marginTop: 8,
                                }}>{item?.product_description}</Text>
                                <TouchableOpacity
                                    style={{
                                        ...styles.color_button,
                                        width: '100%',
                                        backgroundColor: theme.main_color,
                                        marginRight: 0,
                                        marginTop: wp('30%'),
                                    }}
                                    delayPressIn={0} onPressIn={() => {

                                    }}
                                >
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize: themeObj.font.size4
                                    }}>장바구니 담기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalContainer>
                </>
                :
                <>
                </>}

        </>
    )
}
const AlmostFullModal = (props) => {
    const { data, open, handleClose, theme, styles, children } = props;
    return (
        <>
            <Modal
                isVisible={open}
                style={{ flex: 1, justifyContent: "center", alignItems: "center", position: 'relative' }}
                statusBarTranslucent={true} statusBarColor="transparent"
                deviceHeight={hp('109%')}
                onRequestClose={handleClose}
                onBackdropPress={handleClose}
            >
                <View style={{
                    marginTop: wp('5%'),
                    marginBottom: wp('0.5%'),
                    width: wp('98%'),
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                        delayPressIn={0} onPressIn={handleClose}
                    >
                        <Text style={{
                            color: theme.font_color,
                            fontSize: themeObj.font.size1, marginRight: 4
                        }}>닫기</Text>
                        <Icon name="close-a" size={30} color={theme.font_color} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    backgroundColor: '#fff',
                    width: wp('98%'),
                    height: hp('92%'),
                    padding: wp('2%'),
                    borderRadius: themeObj.borderRadius,
                    position: 'relative'
                }}>

                    {children}
                </View>
            </Modal>
        </>
    )
}
