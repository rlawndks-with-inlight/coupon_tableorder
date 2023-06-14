import styled from "styled-components/native";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const Wrappers = styled.View`
flex:1;
flex-direction:${width < 500 ? 'column' : 'row'};
background-color:${props=>props.backgroundColor};
`
export const themeObj = {
    color:{
        background1:'#b93459',
    }
}