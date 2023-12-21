import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    SafeAreaView,
  } from "react-native";
  import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
  import Svg, { Path } from 'react-native-svg';

  export default function SocialGroup() {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable   style={styles.menuButton}>
        <Svg width="25" height="25" viewBox="0 0 65 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path id="Vector" d="M65 30.0752C65 13.4737 50.44 0 32.5 0C14.56 0 0 13.4737 0 30.0752C0 44.6316 11.18 56.7519 26 59.5489V39.0977H19.5V30.0752H26V22.5564C26 16.7519 31.1025 12.0301 37.375 12.0301H45.5V21.0526H39C37.2125 21.0526 35.75 22.406 35.75 24.0601V30.0752H45.5V39.0977H35.75V60C52.1625 58.4962 65 45.6842 65 30.0752Z" fill="#303030"/>
</Svg>
        </Pressable>
        <Pressable style={styles.menuButton}> 
        <Svg width="25" height="25" viewBox="0 0 65 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path id="Vector" d="M32.5 0C14.5525 0 0 13.433 0 30C0 46.567 14.5525 60 32.5 60C50.4475 60 65 46.567 65 30C65 13.433 50.4475 0 32.5 0ZM44.615 42.4286C41.6696 44.933 37.6507 46.4062 32.8555 46.4062C25.9129 46.4062 19.9062 42.7299 16.9827 37.3728C15.7785 35.1562 15.0893 32.6518 15.0893 30C15.0893 27.3482 15.7785 24.8438 16.9827 22.6272C19.9062 17.2634 25.9129 13.5871 32.8555 13.5871C37.6434 13.5871 41.6624 15.2143 44.7455 17.8594L39.6529 22.567C37.8103 20.9397 35.4671 20.1161 32.8627 20.1161C28.2344 20.1161 24.317 23.0022 22.9169 26.8795C22.5614 27.8638 22.3583 28.9152 22.3583 30C22.3583 31.0848 22.5614 32.1362 22.9169 33.1205C24.317 36.9978 28.2344 39.8839 32.8555 39.8839C35.2494 39.8839 37.2807 39.3013 38.8694 38.317C40.7556 37.1518 42.0033 35.4174 42.4169 33.3616H32.8555V27.0134H49.5915C49.8019 28.0915 49.9107 29.2098 49.9107 30.3683C49.9107 35.3705 47.9738 39.5692 44.615 42.4286Z" fill="#303030"/>
</Svg>
        </Pressable>
        <Pressable style={styles.menuButton}>
        <Svg width="25" height="25" viewBox="0 0 65 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path id="Vector" d="M32.5 0C14.5505 0 0 13.4312 0 30C0 46.5688 14.5505 60 32.5 60C50.4495 60 65 46.5688 65 30C65 13.4312 50.4495 0 32.5 0ZM24.5443 42.4344H17.963V22.8844H24.5443V42.4344ZM21.213 20.4844C19.1344 20.4844 17.7904 19.125 17.7904 17.4438C17.7904 15.7281 19.175 14.4094 21.2977 14.4094C23.4203 14.4094 24.7203 15.7281 24.7609 17.4438C24.7609 19.125 23.4203 20.4844 21.213 20.4844ZM48.5807 42.4344H41.9995V31.6C41.9995 29.0781 41.0448 27.3656 38.6648 27.3656C36.8469 27.3656 35.7669 28.525 35.2896 29.6406C35.1135 30.0375 35.0695 30.6 35.0695 31.1594V42.4313H28.4849V29.1188C28.4849 26.6781 28.4003 24.6375 28.3122 22.8813H34.0302L34.3315 25.5969H34.4635C35.3302 24.3219 37.4529 22.4406 41.0042 22.4406C45.3341 22.4406 48.5807 25.1188 48.5807 30.875V42.4344Z" fill="#303030"/>
</Svg>

            </Pressable>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
    },
    menuButton: {
        
        width: 25,
        height: 25,
    }
}
  )