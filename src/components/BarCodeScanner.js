import { StyleSheet, Text, View, Button} from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default Scanner = () => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);


    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        }
        )();
    }, []);

    const handleScan = ({ type, data }) => {
        setScanned(true);
        console.log(`Codigo de barras do tipo ${type} e valor ${data} foi escaneado`);
    };

    if (hasPermission === null) {
        return <Text>Solicito acesso a camera</Text>;
    }

    if (hasPermission === false) {
        return <Text>Sem acesso a camera</Text>;
    }


    return (
        <View style={{flex:1}}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleScan}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={{ margin: 20, position: 'absolute', bottom: 10 }}>
                <Button title={'Clique para escanear'} onPress={() => setScanned(false)} />
            </View>
        </View>
    )
}