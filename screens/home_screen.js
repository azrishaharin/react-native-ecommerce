import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image } from 'react-native'
import { useState, useEffect, React, useCallback} from 'react'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { list, images, deals, offers } from '../assets/dummy_data';
import { SliderBox } from '../node_modules/react-native-image-slider-box/dist/SliderBox';
import { dimensions } from '../style/base';
import axios from 'axios';

const HomeScreen = () => {
  const productList = list;
  const productImages = images;
  const productDeals = deals;
  const productOffers = offers;
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  //using useEffect to axios fakestoreapi products

  useEffect(() => {
    try {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        // console.log(response.data);
        setProducts(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  })

  const onGenderOpen = useCallback(() => {
    // setCompanyOpen(false)
  }, [])



  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'ios' ? 0 : 30, flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          backgroundColor: '#00CED1',
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          flex: 1
        }}>
          <Pressable style={{
            padding: 10,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            borderRadius: 8,
            height: 40
          }}>
            <FontAwesome style={{ paddingLeft: 4 }} name="search" size={20} color="black" />
            <TextInput placeholder='Search products' style={{ paddingLeft: 10 }} />
          </Pressable>
        </View>
        <View style={{ padding: 10, backgroundColor: '#BAF5F0' }}>
          <Pressable style={{ flexDirection: 'row', alignItems: "center", flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: "center", flex: 1 }}>
              <Ionicons style={{ paddingLeft: 12 }} name="ios-location-outline" size={18} color="black" />
              <Text style={{ paddingLeft: 10 }}>Jln Pekaka 8/1, Seksyen 8 Kota Damansara</Text>
            </View>
            <AntDesign name="down" size={18} color="black" />
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {productList.map((item, index) => (
            <Pressable key={index} style={{ margin: 10, borderRadius: '50%', alignItems: "center", justifyContent: "center" }}>
              <Image source={{ uri: item.image }} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
              <Text style={{ marginTop: 4, textAlign: "center", fontSize: 12, fontWeight: 500 }}>{item?.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <SliderBox images={productImages} circleLoop={true} autoPlay style={{ width: "100%", height: 200 }} />
        <Text style={{ paddingVertical: 20, paddingLeft: 10, fontSize: 20, fontWeight: "bold" }}>Trending of the week</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingVertical: 10, marginBottom: 20 }}>
          {productDeals.map((item, index) => (
            <Pressable key={index}>
              <Image source={{ uri: item.image }} style={{ width: 0.5 * dimensions.fullWidth, height: 0.5 * dimensions.fullWidth, resizeMode: 'contain' }} />
            </Pressable>
          ))}
        </View>
        <Text style={{height:1, borderColor:'#D0D0D0', borderWidth:2}}/>
        <View style={{paddingVertical: 20}}>
        <Text style={{ paddingLeft: 20, fontSize: 20, fontWeight: "bold" }}>Today's Deal</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginLeft: 15, marginVertical: 15}}>
          {productOffers.map((item, index) => (
            <Pressable key={index} style={{padding: 5}}>
              <Image source={{ uri: item?.image }} style={{ width: 0.3 * dimensions.fullWidth, height: 0.3 * dimensions.fullWidth, resizeMode: 'contain' }} />
              <View style={{ padding: 5, backgroundColor: "#B31313", alignItems: "center", marginTop: 10 }}>
                <Text style={{ textAlign: "center", fontSize: 16, fontWeight: 500, color: "white" }}>{item?.offer}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        </View>
        <Text style={{height:1, borderColor:'#D0D0D0', borderWidth:2}}/>
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>Browse All Products</Text>

              {/* SEE ALL BUTTON */}
              <Pressable onPress={() => navigation.navigate("Products")}>
              <Text style={{ padding: 20, fontSize: 16, color: "#7D7C7C" }}>See All</Text>
              </Pressable>

              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", paddingVertical: 10, alignItems: "center", justifyContent: "space-evenly" }}>
              {products.map((item, index) => (
                <View key={index} style={{width: 0.45 * dimensions.fullWidth}}>
                  <Image source={{ uri: item.image }} style={{ width: 100, height: 200, resizeMode: 'contain', alignSelf: "center" }} />
                  <Text numberOfLines={1} style={{ textAlign: "center", fontSize: 12 }}>{item?.title}</Text>
                  <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 5}}>
                    <Text style={{color: "#B31313", fontSize: 14, fontWeight: 500}}>${item?.price}</Text>
                    <View style={{flexDirection: "row", alignItems: "center",}}>
                    <FontAwesome name="star" size={14} color="#FFC72C" />
                    <Text style={{fontSize: 14, color: "#FFC72C", marginLeft: 2}}>{item?.rating?.rate}</Text>
                    </View>
                  </View>
                </View>
              ))}
              </View>
            </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})