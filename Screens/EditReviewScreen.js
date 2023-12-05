import React, {useState} from "react";
import { StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView } from "react-native";
import { useRoute, CommonActions } from '@react-navigation/native';
import KeyboardAvoidingWrapper from "./components/KeyboardAvoidingView";
import { SafeAreaView } from "react-native-safe-area-context";
import Triangle from "react-native-triangle";
import realm, { addReview, deleteReview, getReviewsByTypeNameAndItemName, numberOfReviewsByTypeName, addBrand, deleteBrand, numberOfBrandsByName, addRestaurant, numberOfRestaurantsByName, deleteRestaurant} from "./components/Database";

const starRatings = [1,2,3,4,5];

function submission(review, itemName, RestaurantOrBrand, restaurantOrBrandName, defaultRating, notes, imgIndex, navigation){
    if(itemName != '' && RestaurantOrBrand != '' && restaurantOrBrandName != ''){
        //delete old Brand/Restaurant if needed
        if(review.Type == 'Brand'){
            //check if any more reviews for that Brand
            if(numberOfReviewsByTypeName(review.TypeName, review.Type) == 1) {
                deleteBrand(review.TypeName) //delete if none
        }}
        else { //if review.Type != 'Brand' ( == 'Restaurant')
            //check if any more reviews for that Restaurant
            if(numberOfReviewsByTypeName(review.TypeName, review.Type) == 1) {
                deleteRestaurant(review.TypeName) //delete if none
        }}

        deleteReview(review.Type, review.TypeName, review.ItemName)

        addReview(itemName, RestaurantOrBrand, restaurantOrBrandName, defaultRating, notes, imgIndex)
        
        //add new Brand/Restaurant if needed
        if(RestaurantOrBrand == 'Brand'){
            //check if brand already in Brands
            if(numberOfBrandsByName(restaurantOrBrandName) == 0) {
                addBrand(restaurantOrBrandName) //add if not found
        }}
        else {
            //check if restaurant already in Restaurants
            if(numberOfRestaurantsByName(restaurantOrBrandName) == 0) {
                addRestaurant(restaurantOrBrandName) //add if not found
        }}

        //navigate out of page to home then displayreview
        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Home' },
                { name: 'Display Review',
                  params: { EntityName: restaurantOrBrandName, Item: itemName },
                },
              ],
            })
          );
    }
    else {
        alert("Missing inputs detected!")
    }
}

export default function EditReviewScreen({ route, navigation }){

    const entityName = route.params.EntityName.toString();
    const item = route.params.Item.toString();

    const review = getReviewsByTypeNameAndItemName(entityName, item)[0];

    const [defaultRating, SetDefault] = useState(starRatings[review.Rating - 1])
    const [setMax, SetMaxRating] = useState(starRatings)

    const StarEmpty = require('./assets/Star_Empty.png')
    const StarFull = require('./assets/star_full.png')

    const RatingBar = () =>{
        return(
            <View style={ratingStyle.container}>
                <View style={ratingStyle.starView}>
                {
                    setMax.map((item, key) =>
                        <TouchableOpacity activeOpacity={0.7}
                            key={item}
                            onPress={() => SetDefault(item)}>
                            <Image style={ratingStyle.starStyling}
                                source={item <= defaultRating ? StarFull : StarEmpty}/>
                        </TouchableOpacity>
                    )
                }
                </View>
            </View>
            
        );
    }

    const [itemName, setItemName] = useState(review.ItemName);
    const [restaurantOrBrandName, SetRestaurantOrBrandName] = useState(review.TypeName);
    const [notes, setNotes] = useState(review.Notes);

    const [placeholder, setPlaceholder] = useState("Enter ___________ Name...")
    const [RestaurantOrBrand, setRestaurantOrBrand] = useState(review.Type)
    const [selectedButton, setSelectedButton] = useState(review.Type);
    const selectButton = ( option ) => {
        setRestaurantOrBrand(option)
        setSelectedButton(option)
        let placeholder = "Enter " + option + " Name..."
        setPlaceholder(placeholder)

    }

    const images = [
        require('./assets/images/breakfast1.png'),
        require('./assets/images/breakfast2.png'),
        require('./assets/images/breakfast3.png'),
        require('./assets/images/lunch1.png'),
        require('./assets/images/lunch2.png'),
        require('./assets/images/lunch3.png'),
        require('./assets/images/dinner1.png'),
        require('./assets/images/dinner2.png'),
        require('./assets/images/dinner3.png'),
        require('./assets/images/drink1.png'),
        require('./assets/images/drink2.png'),
        require('./assets/images/drink3.png'),
        require('./assets/images/fastfood1.png'),
        require('./assets/images/fastfood2.png'),
        require('./assets/images/fastfood3.png'),
        require('./assets/images/healthy1.png'),
        require('./assets/images/healthy2.png'),
        require('./assets/images/healthy3.png'),
        require('./assets/images/desert1.png'),
        require('./assets/images/desert2.png'),
        require('./assets/images/desert3.png'),
    ]

    const [imgIndex, setImageIndex] = useState(review.ImageIndex)
    const setImgIndex = ( index ) => {
        let newIndex = index % images.length;
        if(newIndex > 0 && newIndex < images.length)
            setImageIndex(newIndex)
        else if(newIndex < 0)
            setImageIndex(images.length - 1)
        else
            setImageIndex(0)
    }

    return(
        <KeyboardAvoidingWrapper>
        <View style={styles.container}>

            <View style={styles.picBackdrop}>
                <View style={{backgroundColor: 'white', width: 165, height: 165, justifyContent: "center", alignItems: "center"}}>
                    <Image style={styles.image} source={images[imgIndex]}></Image>
                </View>
            </View>

            <Text style={styles.selectImage}>Select Image:</Text>
            <View style={styles.selectImageView}>
                <TouchableOpacity onPress={() => setImgIndex(imgIndex - 1)}>
                    <Triangle width={45} height={45} color={'#545F71'} direction={'left'}/>
                </TouchableOpacity>
                <Text style={styles.selectImageIndex}>{imgIndex + 1}</Text>
                <TouchableOpacity onPress={() => setImgIndex(imgIndex + 1)}>
                    <Triangle width={45} height={45} color={'#545F71'} direction={'right'}/>
                </TouchableOpacity>
            </View>

            <Text style={styles.itemNameText}>Item Name: </Text>
            <View style={styles.textBox}>
                <TextInput  style={styles.textInput} 
                            placeholder="Enter Item Name..."
                            onChangeText={(text) => setItemName(text)}
                            value={itemName}/>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity   style={[styles.buttons,
                                            selectedButton === "Restaurant" ? styles.selected : styles.unselected]} 
                                    onPress={() => selectButton('Restaurant')}>
                    <Text style={styles.buttonText}>Restaurant</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>OR</Text>
                <TouchableOpacity   style={[styles.buttons, 
                                            selectedButton === "Brands" ? styles.selected : styles.unselected]} 
                                    onPress={() => selectButton('Brands')}>
                    <Text style={styles.buttonText}>Brand</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.itemNameText} >{RestaurantOrBrand} Name: </Text>
            <View style={styles.textBox}>
                <TextInput  style={styles.textInput} 
                            placeholder={placeholder}
                            onChangeText={(text) => SetRestaurantOrBrandName(text)}
                            value={restaurantOrBrandName}/>
            </View>

            <View style={styles.ratingContainer}>
                <Text style={styles.YourRating}>Your Rating:</Text>
                <RatingBar/>
            </View>

            <View style={{width: '95%'}}>
                <Text style={styles.notesText}>Notes: </Text>
                    <ScrollView style={styles.notesTextBox}>
                        <TextInput style={styles.textInput}
                            placeholder="Enter Notes..."
                            onChangeText={(text) => setNotes(text)}
                            value={notes}
                            multiline // This allows multiline input for notes
                        />
                    </ScrollView>
            </View>

            <View style={styles.SubmitContainer}>
                <TouchableOpacity   style={styles.Submit}
                                    onPress={() =>  submission(review, itemName, RestaurantOrBrand, restaurantOrBrandName, defaultRating, notes, imgIndex, navigation)}>
                    <Text style={styles.SubmitText}>Submit</Text>
                </TouchableOpacity>
            </View>    
            
        </View>
        </KeyboardAvoidingWrapper>

    );
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
    },
    picBackdrop: {
        backgroundColor: '#545F71',
        width: '100%',
        height: 185,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        backgroundColor: 'white',
        width: 155,
        height: 155,
    },
    selectImage: {
        fontSize: 20
    },
    selectImageView: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    selectImageIndex: {
        backgroundColor: '#D9D9D9',
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        margin: 5,
        paddingHorizontal:12,
        paddingVertical: 5,
        borderColor: 'black',
        borderWidth: 2
    },
    itemNameText: {
        width: '95%',
        fontSize: 20,
        fontWeight: "bold"
    },
    textBox: {
        backgroundColor: "white",
        width: '95%',
        height: 35,
        borderColor: '#888888',
        borderWidth: 2,
        borderRadius: 5
    },
    textInput: {
        fontSize: 15,
        paddingHorizontal: 5
    },
    buttonsContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        width: '95%',
        marginTop: 10, 
        marginBottom: 5,
    },
    orText: {
        padding: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    buttons: {
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
    },
    unselected: {
        backgroundColor: '#9CA3AF'
    },
    selected: {
        backgroundColor: '#545F71'
    },
    ratingContainer: {
        //backgroundColor: "red",
        width: '95%',
        marginTop: 10,
        flexDirection: "row",
    },
    YourRating: {
        //backgroundColor: 'red',
        textAlign: "center",
        paddingVertical: 4,
        fontSize: 20,
        fontWeight: "bold"
    },
    notesText: {
        width: '95%',
        fontSize: 20,
        fontWeight: 'bold',
    },
    notesTextBox: {
        backgroundColor: 'white',
        borderColor: '#9CA3AF',
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        height: 100
    },
    SubmitContainer: {
        height: 70,
        width: '95%',
        justifyContent: "center",
        alignItems: 'center'

    },
    Submit: {
        height: '75%',
        width: '50%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#545F71',
        borderRadius: 5
    },
    SubmitText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }

})


const ratingStyle = StyleSheet.create({
    starStyling: {
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
    starView: {
        marginLeft: 20,
        flexDirection: 'row'
    }
})