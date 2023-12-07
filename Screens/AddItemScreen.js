import React, { useState } from "react";
import {  
    View, 
    Text, } from "react-native";
import KeyboardAvoidingWrapper from "./components/KeyboardAvoidingView";
import { AddEditReviewStyles } from './components/style-sheet';
import RatingBar from "./components/RatingsComponents";
import { ShowImage, ChangeImage } from "./components/ImageComponents";
import { ItemInput, RestaurantOrBrandNameInput, NotesInput } from "./components/InputTextComponents";
import { ChooseBrandorRestaurantButtons, SubmitReviewButton } from "./components/ButtonComponents";

export default function AddItemScreen({ navigation }){

    const [itemName, setItemName] = useState('');
    const [RestaurantOrBrand, setRestaurantOrBrand] = useState('')
    const [restaurantOrBrandName, SetRestaurantOrBrandName] = useState('');
    const [defaultRating, SetDefault] = useState(1)
    const [notes, setNotes] = useState('');
    const [imgIndex, setImageIndex] = useState(0)
    const reviewProperties = [
        itemName,
        RestaurantOrBrand,
        restaurantOrBrandName,
        defaultRating,
        notes,
        imgIndex
    ]

    const [placeholder, setPlaceholder] = useState("Enter ___________ Name...")

    return(
        <KeyboardAvoidingWrapper>
        <View style={AddEditReviewStyles.container}>

            <ShowImage index={imgIndex} backdropHeight={185} imageHtWd={165}/>
            <Text style={AddEditReviewStyles.selectImage}>Select Image:</Text>
            <ChangeImage imgIndex={imgIndex} setImageIndex={setImageIndex}/>

            <Text style={AddEditReviewStyles.itemNameText}>Item Name: </Text>
            <ItemInput itemName={itemName} setItemName={setItemName}/>

            <ChooseBrandorRestaurantButtons setRestaurantOrBrand={setRestaurantOrBrand}
                                            RestaurantOrBrand={RestaurantOrBrand}
                                            setPlaceholder={setPlaceholder}/>

            <Text style={AddEditReviewStyles.itemNameText} >{RestaurantOrBrand} Name: </Text>
            <RestaurantOrBrandNameInput restaurantOrBrandName={restaurantOrBrandName}
                            SetRestaurantOrBrandName={SetRestaurantOrBrandName}
                            placeholder={placeholder}/>

            <View style={AddEditReviewStyles.ratingContainer}>
                <Text style={AddEditReviewStyles.YourRating}>Your Rating:</Text>
                <RatingBar setRating={SetDefault} currentRating={defaultRating}/>
            </View>

            <NotesInput notes={notes} setNotes={setNotes}/>

            <SubmitReviewButton reviewProperties={reviewProperties} navigation={navigation}/>   
            
        </View>
        </KeyboardAvoidingWrapper>

    );
}
