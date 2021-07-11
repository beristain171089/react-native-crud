import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Platform
} from "react-native";
import {
    TextInput,
    Headline,
    Button,
    Paragraph,
    Dialog,
    Portal
} from "react-native-paper";
import globalStyles from "../styles/global";
import axios from 'axios'

const NuevoCliente = ({ navigation, route }) => {

    const { guardarConsultarAPI } = route.params;

    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');
    const [alerta, guardarAlerta] = useState(false);

    //detectar si estamos editando cliente
    useEffect(() => {
        if (route.params.cliente) {
            const { nombre, telefono, correo, empresa } = route.params.cliente;
            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo);
            guardarEmpresa(empresa);
        }
    }, [])

    const guardarCliente = async () => {
        //Validar
        if (nombre.trim() === '' ||
            telefono.trim() === '' ||
            correo.trim() === '' ||
            empresa.trim() === '') {
            guardarAlerta(true)
            return;
        }

        //generar cliente en la API
        const cliente = { nombre, telefono, correo, empresa };

        if (route.params.cliente) {

            const { id } = route.params.cliente;
            cliente.id = id;

            //editar nuevo cliente
            try {

                if (Platform.OS === 'ios') {
                    //para ios
                    await axios.put(`http://localhost:3000/clientes/${id}`, cliente)
                } else {
                    //para android dispositivo fisico (ejecutar adb reverse tcp:3000 tcp:3000)
                    await axios.put(`http://localhost:3000/clientes/${id}`, cliente);
                    //para android amulador
                    ///await axios.put(`http://10.0.2.2:3000/clientes/${id}`, cliente);
                }

            } catch (error) {
                console.log(error);
            }

        } else {

            //guardar nuevo cliente
            try {

                if (Platform.OS === 'ios') {
                    //para ios
                    await axios.post("http://localhost:3000/clientes", cliente)
                } else {
                    //para android dispositivo fisico (ejecutar adb reverse tcp:3000 tcp:3000)
                    await axios.post('http://localhost:3000/clientes', cliente);
                    //para android amulador
                    ///await axios.post('http://10.0.2.2:3000/clientes', cliente);
                }

            } catch (error) {
                console.log(error);
            }
        }

        //redireccionar
        navigation.navigate('Inicio')

        //limpiar form (opcional)        
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

        //cambiar a true
        guardarConsultarAPI(true);
    }

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Guardar Cliente</Headline>
            <TextInput
                style={styles.input}
                label="Nombre"
                placeholder="Luis"
                onChangeText={texto => guardarNombre(texto)}
                value={nombre}
            />
            <TextInput
                style={styles.input}
                label="Teléfono"
                placeholder="9983150115"
                onChangeText={texto => guardarTelefono(texto)}
                value={telefono}
            />
            <TextInput
                style={styles.input}
                label="Correo"
                placeholder="correo@mail.com"
                onChangeText={texto => guardarCorreo(texto)}
                value={correo}
            />
            <TextInput
                style={styles.input}
                label="Empresa"
                placeholder="Coca-Cola"
                onChangeText={texto => guardarEmpresa(texto)}
                value={empresa}
            />
            <Button
                icon="pencil-circle"
                mode="contained"
                onPress={() => guardarCliente()}>
                Guardar Cliente
            </Button>
            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={() => guardarAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => guardarAlerta(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente;