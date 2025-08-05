import React, { useEffect } from 'react'

const SHEET_ID = "1tuRA0qbkS5d5A3osrRhnHzL1zKuqgkkzmNK06OecY4s";
const API_KEY = "AIzaSyDQKDDCOgsyxt3hqIMjG_lqILOQ06DuL9c";
const RANGE = "Sheet1!A1:D10";

const sheetId = "1tuRA0qbkS5d5A3osrRhnHzL1zKuqgkkzmNK06OecY4s";
const sheetName = "Products";

const ExcelReader = () => {
    useEffect(() => {
        fetch(
            `https://opensheet.elk.sh/${sheetId}/${sheetName}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                console.log("ssss")
            });
    }, [])
    return (
        <div>ExcelReader</div>
    )
}

export default ExcelReader