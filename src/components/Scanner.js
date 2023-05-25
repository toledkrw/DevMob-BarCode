import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';

export default Scanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleScan = ({ type, data }) => {
        setScanned(true);
        setScannedData({ type, data });
    };

    const storeScannedInfo = async (data) => {
        const fileUri = FileSystem.documentDirectory + "scanned_data.txt";
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        let content = "";
        if (fileInfo.exists) {
            const existingContent = await FileSystem.readAsStringAsync(fileUri);
            content = existingContent + "\n";
        }

        content += data;

        await FileSystem.writeAsStringAsync(fileUri, content);
        console.log("Arquivo salvo em:", fileUri);
    };

    if (hasPermission === null) {
        return <Text>Requires Camera access.</Text>;
    }

    if (hasPermission === false) {
        return <Text>Have no Camera access.</Text>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#121212" }}>
            <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleScan} style={StyleSheet.absoluteFillObject}/>
            <View style={{ flex: 1, bottom: 20 }}>
                {scanned && (
                    <View style={{flex: 1,flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-end"}}>
                        <Button title={"Press to scan again"} onPress={() => setScanned(false)}/>
                        <Button title={"Press to store scanned info"} onPress={() => scannedData ? storeScannedInfo(scannedData).then(setScanned(false)) : undefined}/>
                    </View>
                )}
            </View>
        </View>
    );
};
