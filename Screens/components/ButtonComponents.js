import React, { useState } from "react";
import {  
    View,
    TouchableOpacity,
    Text } from "react-native";
import HomeStyles, { AddEditReviewStyles, reviewListStyles, displayReviewStyles } from './style-sheet';
import { CommonActions, StackActions } from '@react-navigation/native';
import { addReview,
         addBrand,
         addRestaurant,
         deleteBrand,
         deleteRestaurant,
         deleteReview,
         numberOfBrandsByName,
         numberOfRestaurantsByName,
         numberOfReviewsByTypeName,
         doesReviewExist} from "./Database";

function PageSelectionButton({page, navigation}){
    return(
        <TouchableOpacity style={HomeStyles.buttonContainer}
            onPress={() => {navigation.navigate(page)}}
            title={page}>
            <Text style={HomeStyles.buttonText}>{page}</Text>
        </TouchableOpacity>
    );
}

function DisplayThisReviewButton({item, navigation}){
    return(
        <TouchableOpacity style={reviewListStyles.displayReviewButton}
            title='Display Review'
            onPress={() => {
                navigation.navigate('Display Review', {
                    EntityName : item.TypeName,
                    Item: item.ItemName
                })
            }}>
            <Text style={{fontSize: 12, color: "white"}}>Display{'\n'}Review</Text>
        </TouchableOpacity>
    )
}

function ChooseBrandorRestaurantButtons({setRestaurantOrBrand, RestaurantOrBrand, setPlaceholder}) {
    
    const selectButton = (option) => {
        setRestaurantOrBrand(option)
        let newPlaceholder = "Enter " + option + " Name..."
        setPlaceholder(newPlaceholder)
    }

    return(
        <View style={AddEditReviewStyles.buttonsContainer}>
            <TouchableOpacity   style={[AddEditReviewStyles.buttons,
                                        RestaurantOrBrand === "Restaurant" ? AddEditReviewStyles.selected : AddEditReviewStyles.unselected]} 
                                onPress={() => selectButton('Restaurant')}>
                <Text style={AddEditReviewStyles.buttonText}>Restaurant</Text>
            </TouchableOpacity>
            <Text style={AddEditReviewStyles.orText}>OR</Text>
            <TouchableOpacity   style={[AddEditReviewStyles.buttons, 
                                        RestaurantOrBrand === "Brand" ? AddEditReviewStyles.selected : AddEditReviewStyles.unselected]} 
                                onPress={() => selectButton('Brand')}>
                <Text style={AddEditReviewStyles.buttonText}>Brand</Text>
            </TouchableOpacity>
        </View>
    )
}

function deleteThisReview(type, typeName, itemName, navigation = null) {
    if(type == 'Brand'){
        //check if any more reviews for that Brand
        if(numberOfReviewsByTypeName(typeName, type) == 1) {
            deleteBrand(typeName) //delete if none
    }}
    else { //if review.Type != 'Brand' ( == 'Restaurant')
        //check if any more reviews for that Restaurant
        if(numberOfReviewsByTypeName(typeName, type) == 1) {
            deleteRestaurant(typeName) //delete if none
    }}

    deleteReview(type, typeName, itemName)

    if(navigation != null){
        navigation.dispatch(StackActions.popToTop()); //go back to home
    }
}

function submission({reviewProperties, navigation, oldReview = null}){
    const oldItem = oldReview ? oldReview.ItemName : null
    const oldType = oldReview ? oldReview.Type : null
    const oldTypeName = oldReview ? oldReview.TypeName : null
    const oldRating = oldReview ? oldReview.Rating : null
    const oldNotes = oldReview ? oldReview.Notes : null
    const oldIndex = oldReview ? oldReview.ImageIndex : null

    if(reviewProperties[0] != '' && reviewProperties[1] != '' && reviewProperties[2] != ''){
        oldReview ? deleteThisReview(oldType, oldTypeName, oldItem) : doesReviewExist(reviewProperties[1], reviewProperties[2], reviewProperties[0]);

        if(doesReviewExist(reviewProperties[1], reviewProperties[2], reviewProperties[0]) == false) {
            addReview(reviewProperties[0], reviewProperties[1], reviewProperties[2], reviewProperties[3], reviewProperties[4], reviewProperties[5])
            //add new Brand/Restaurant if needed
            if(reviewProperties[1] == 'Brand'){
                //check if brand already in Brands
                if(numberOfBrandsByName(reviewProperties[2]) == 0) {
                    addBrand(reviewProperties[2]) //add if not found
            }}
            else if(reviewProperties[1] == 'Restaurant'){
                //check if restaurant already in Restaurants
                if(numberOfRestaurantsByName(reviewProperties[2]) == 0) {
                    addRestaurant(reviewProperties[2]) //add if not found
            }}
            //navigate out of page to home then displayreview
            navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Home' },
                    { name: 'Display Review',
                      params: { EntityName: reviewProperties[2], Item: reviewProperties[0] },
                    },
                  ],
                })
            );
        }
        else { 
            alert("Review already exists!")
            if(oldReview != null){
                addReview(oldItem, oldType, oldTypeName, oldRating, oldNotes, oldIndex)
            }
        }
    }
    else { alert("Missing inputs detected!") }
}

function EditButton({review, navigation}){
    return(
        <TouchableOpacity style={displayReviewStyles.EditDeleteButtons}
            onPress={() => {
                navigation.navigate('Edit Review', {
                  EntityName : review.TypeName,
                  Item: review.ItemName
                })
            }}>
            <Text style={{fontSize: 30, color: "white"}}>Edit</Text>
        </TouchableOpacity>
    );
}

function SubmitReviewButton({reviewProperties, navigation, oldReview = null}){
    return(
        <View style={AddEditReviewStyles.SubmitContainer}>
            <TouchableOpacity   style={AddEditReviewStyles.Submit}
                                onPress={() =>  submission({reviewProperties, navigation, oldReview})}>
                <Text style={AddEditReviewStyles.SubmitText}>Submit</Text>
            </TouchableOpacity>
        </View> 
    )
}

function DeleteReviewButton({review, navigation}){
    return(
        <TouchableOpacity style={displayReviewStyles.EditDeleteButtons}
            onPress={() => { deleteThisReview(review.Type, review.TypeName, review.ItemName, navigation) }}>
            <Text style={{fontSize: 30, color: "white"}}>Delete</Text>
        </TouchableOpacity>
    );
}

export { PageSelectionButton,
         DisplayThisReviewButton,
         ChooseBrandorRestaurantButtons,
         EditButton,
         SubmitReviewButton,
         DeleteReviewButton }