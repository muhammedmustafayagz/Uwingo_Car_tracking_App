import { DatePickerComponent } from "@/components/DatePicker";
import DropdownComponent from "@/components/DropDown";
import LucideIconButton from "@/components/IconButton/LucideIconButton";
import InputErrorMessage from "@/components/InputErrorMessage";
import { vehicleCascoApplicationSchema, VehicleCascoApplicationT } from "@/types/comingData/vehicleCasco";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



// TODO : END DATE SHOULDN'T BE SMALLER THAN THE START DATE THERE IS A WRONG WITH ZOD SCHEME 

interface vehicleCascoFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<VehicleCascoApplicationT>, method: "put" | 'post') => void;
  initialData?: VehicleCascoApplicationT | null;
  vehiclesData: { label: string, value: number }[] | undefined

}

const vehicleCascoFormModal = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  vehiclesData = []

}: vehicleCascoFormModalProps) => {


  const [method, setMethod] = useState<"put" | "post">('post')
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    // Using .partial() or .pick() here so it doesn't complain about missing fields
    resolver: zodResolver(vehicleCascoApplicationSchema.pick({
      vehicleId: true,
      startDate: true,
      endDate: true,
      insuranceCompany: true,
      policyNumber: true,

    })),
    defaultValues: {
      vehicleId: undefined,
      startDate: undefined,
      endDate: undefined,
      insuranceCompany: "",
      policyNumber: "",

    },
  });



  useEffect(() => {
    console.log('inital data', initialData)

    if (visible) {
      if (initialData && Object.keys(initialData).length > 0) {
        setMethod('put')
        console.log('here even if its ', initialData)
        reset({
          ...initialData,
          startDate: initialData.startDate,
          endDate: initialData.endDate
        })
      } else {
        setMethod('post')
        reset({
          vehicleId: undefined,
          startDate: new Date().toISOString().split('.')[0],
          endDate: new Date().toISOString().split('.')[0],
          insuranceCompany: "",
          policyNumber: "",
        });
      }
    }
  }, [initialData, visible, reset]);




  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContainer}>

          <View style={styles.header}>
            <Text style={styles.title}>{initialData ? 'Edit Casco Information' : 'Add Casco Information'}</Text>
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
            <Text style={styles.label}>Vehicle Plate</Text>
            <Controller
              control={control}
              name="vehicleId"
              render={({ field: { onChange, value } }) => (

                <>


                  <DropdownComponent
                    value={value}
                    onChange={onChange}
                    data={vehiclesData}
                  />

                  {
                    errors?.vehicleId && (
                      <InputErrorMessage errorMessage={errors?.vehicleId?.message} />
                    )
                  }

                </>

              )} />

            <Text style={styles.label}> Policy Number</Text>
            <Controller
              control={control}
              name="policyNumber"
              render={({ field: { onChange, value } }) => (

                <>


                  <TextInput
                    style={[styles.input, errors.policyNumber && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="policyNumber"
                  />

                  {
                    errors?.policyNumber && (
                      <InputErrorMessage errorMessage={errors?.policyNumber?.message} />
                    )
                  }

                </>

              )} />

            <Text style={styles.label}> Start Date</Text>
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange, value } }) => (
                <DatePickerComponent value={value} onChange={(val) => onChange(val.split(".")[0])} />
              )}
            />

            <Text style={styles.label}> End Date</Text>
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, value } }) => (
                <>


                  <DatePickerComponent value={value} onChange={(val) => onChange(val.split(".")[0])} />
                  {
                    errors?.endDate && (<InputErrorMessage errorMessage={errors.endDate?.message} />)
                  }

                </>
              )}
            />










            {/* Performed By  */}



            {/* Description */}
            <Text style={styles.label}> Insurance Compnay</Text>
            <Controller
              control={control}
              name="insuranceCompany"
              render={({ field: { onChange, value } }) => (

                <>


                  <TextInput
                    style={[styles.input, errors.insuranceCompany && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    placeholder="insuranceCompany"
                  />

                  {
                    errors?.insuranceCompany && (
                      <InputErrorMessage errorMessage={errors?.insuranceCompany?.message} />
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

export default vehicleCascoFormModal



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