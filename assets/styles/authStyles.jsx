import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from '../../utils/responsive.jsx';
import {COLORS} from '../../constant/colors.jsx'



// ↔️ scale = left/right
// ↕️ verticalScale = up/down
// 🔤 moderateScale = text/font

// Yes. Use this simple rule:

// padding / margin → scale()
// paddingHorizontal / marginHorizontal → scale()
// paddingVertical / marginVertical → verticalScale()
// paddingTop/Bottom / marginTop/Bottom → verticalScale()
// fontSize → moderateScale()

// width → scale() ↔️
// height → verticalScale() ↕️

export const createAuthStyles = StyleSheet.create({
Container:{
    backgroundColor:COLORS.background,
    display:'flex',
    flex:1,
   justifyContent:'center',
   alignItems:'center',  
   marginTop:scale(-150),
},
logo:{
width:scale(170),
height:verticalScale(200),
},
pageText:{
fontSize:moderateScale(25),
fontWeight:'600',
marginBottom:scale(15),
},
input:{
    backgroundColor:COLORS.surface,
    width:'85%',
    margin:scale(7),
    padding:scale(10),
    borderRadius:10,
    borderWidth:1,
    borderColor:COLORS.border,
    color:COLORS.primary,
},
signBtn:{
    backgroundColor:COLORS.primary,
    color:COLORS.error,
    width:'85%',
    borderRadius:10,
    padding:scale(10),
    marginTop:scale(10),
    marginBottom:scale(15),
    display:'flex',
    alignItems:'center',
},
signBtnTxt:{
    color:COLORS.textOnPrimary,
    fontSize:moderateScale(16),
    fontWeight:'500',
},
haveAccView:{
    display:'flex',
    flexDirection:'row',
    marginTop:scale(5),
},
link:{
    color:COLORS.primary,
    fontWeight:'600'
},
getStartedImg:{
    width:scale(300),
    height:verticalScale(300),
    resizeMode:'contain',
},
getStartedScreen:{
    flex:1,
    backgroundColor:COLORS.background,
},
getStartedHeader:{
    alignItems:'flex-end',
    paddingHorizontal:scale(24),
    paddingTop:verticalScale(16),
},
getStartedSkip:{
    color:COLORS.textSecondary,
    fontSize:moderateScale(15),
    fontWeight:'600',
    padding:scale(8),
},
getStartedSlide:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:scale(28),
},
getStartedImageWrap:{
    width:scale(310),
    height:verticalScale(330),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:COLORS.surface,
    borderRadius:moderateScale(34),
    shadowColor:COLORS.primary,
    shadowOpacity:0.12,
    shadowRadius:moderateScale(22),
    shadowOffset:{ width:0, height:verticalScale(10) },
    elevation:5,
},
getStartedTextWrap:{
    alignItems:'center',
    marginTop:verticalScale(34),
},
getStartedFirstText:{
    color:COLORS.primary,
    fontSize:moderateScale(27),
    fontWeight:'700',
    textAlign:'center',
},
getStartedSecondText:{
    color:COLORS.textSecondary,
    fontSize:moderateScale(16),
    lineHeight:moderateScale(24),
    textAlign:'center',
    marginTop:verticalScale(12),
    maxWidth:scale(310),
},
getStartedFooter:{
    paddingHorizontal:scale(28),
    paddingBottom:verticalScale(24),
},
getStartedPagination:{
    flexDirection:'row',
    justifyContent:'center',
    gap:scale(8),
    marginBottom:verticalScale(26),
},
getStartedDot:{
    width:scale(8),
    height:scale(8),
    borderRadius:scale(4),
    backgroundColor:COLORS.border,
},
getStartedDotActive:{
    width:scale(26),
    backgroundColor:COLORS.primary,
},
getStartedButton:{
    height:verticalScale(54),
    borderRadius:moderateScale(16),
    backgroundColor:COLORS.primary,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:COLORS.primary,
    shadowOpacity:0.24,
    shadowRadius:moderateScale(12),
    shadowOffset:{ width:0, height:verticalScale(6) },
    elevation:4,
},
getStartedButtonPressed:{
    backgroundColor:COLORS.primaryPressed,
},
getStartedButtonText:{
    color:COLORS.textOnPrimary,
    fontSize:moderateScale(17),
    fontWeight:'700',
},


})
