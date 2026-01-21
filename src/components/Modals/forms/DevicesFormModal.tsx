import DropdownComponent from "@/components/DropDown";
import LucideIconButton from "@/components/IconButton/LucideIconButton";
import InputErrorMessage from "@/components/InputErrorMessage";
import { DeviceApplicationSchema, DeviceApplicationT } from "@/types/comingData/devices";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



// TODO : END DATE SHOULDN'T BE SMALLER THAN THE START DATE THERE IS A WRONG WITH ZOD SCHEME 

interface DevicesFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<DeviceApplicationT>, method: "put" | 'post') => void;
  initialData?: DeviceApplicationT | null;
  packetsData: { label: string, value: string }[] | undefined

}

const DevicesFormModal = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  packetsData = []

}: DevicesFormModalProps) => {


  const [method, setMethod] = useState<"put" | "post">('post')
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(DeviceApplicationSchema.pick({
      serialNumber: true,
      model: true,
      packetType: true,
      devicePhoneNumber: true,

    })),
    defaultValues: {
      serialNumber: "",
      model: "",
      packetType: "",
      devicePhoneNumber: "",

    },
  });



  useEffect(() => {
    console.log('inital data', initialData)

    if (visible) {
      if (initialData && Object.keys(initialData).length > 0) {
        setMethod('put')
        console.log('here even if its ', initialData)
        reset(initialData)
      } else {
        setMethod('post')
        reset({
          serialNumber: "",
          model: "",
          packetType: "",
          devicePhoneNumber: "",
        });
      }
    }
  }, [initialData, visible, reset]);




  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContainer}>

          <View style={styles.header}>
            <Text style={styles.title}>{initialData ? 'Edit Device' : 'Add Device'}</Text>
            <LucideIconButton
              icon='X'
              size={24}
              iconColor={'#333'}
              containerColor={'transparent'}
              onPress={onClose}
            />
          </View>
          <ScrollView style={styles.form}>
            {/* vehicle plate */}
            <Text style={styles.label}>Packet Type</Text>
            <Controller
              control={control}
              name="packetType"
              render={({ field: { onChange, value } }) => (

                <>


                  <DropdownComponent
                    value={value}
                    onChange={onChange}
                    data={packetsData}
                  />

                  {
                    errors?.packetType && (
                      <InputErrorMessage errorMessage={errors?.packetType?.message} />
                    )
                  }

                </>

              )} />

            <Text style={styles.label}> Model</Text>
            <Controller
              control={control}
              name="model"
              render={({ field: { onChange, value } }) => (

                <>


                  <TextInput
                    style={[styles.input, errors.model && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="Model"
                  />

                  {
                    errors?.model && (
                      <InputErrorMessage errorMessage={errors?.model?.message} />
                    )
                  }

                </>

              )} />






            <Text style={styles.label}> Serial Number</Text>
            <Controller
              control={control}
              name="serialNumber"
              render={({ field: { onChange, value } }) => (

                <>


                  <TextInput
                    style={[styles.input, errors.serialNumber && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="serialNumber"
                  />

                  {
                    errors?.serialNumber && (
                      <InputErrorMessage errorMessage={errors?.serialNumber?.message} />
                    )
                  }

                </>

              )} />



            <Text style={styles.label}> Device Phone Number</Text>
            <Controller
              control={control}
              name="devicePhoneNumber"
              render={({ field: { onChange, value } }) => (

                <>


                  <TextInput
                    style={[styles.input, errors.devicePhoneNumber && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="devicePhoneNumber"
                  />

                  {
                    errors?.devicePhoneNumber && (
                      <InputErrorMessage errorMessage={errors?.devicePhoneNumber?.message} />
                    )
                  }

                </>

              )} />



          </ScrollView>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(
              (data) => onSubmit(data, method),
              (error) => console.log(error)
            )}
          >
            <Text style={styles.saveButtonText}>Save Details</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default DevicesFormModal



const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '90%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  form: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  inputError: { borderColor: '#FF3B30' },
  row: { flexDirection: 'row' },
  flex1: { flex: 1 },
  pickerContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  radioBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, alignItems: 'center' },
  radioBtnActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  radioText: { fontWeight: '600', color: '#666' },
  radioTextActive: { color: 'white' },
  saveButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 30 },
  saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});