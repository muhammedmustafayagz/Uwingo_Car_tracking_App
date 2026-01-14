import ResponsiveTable from '@/components/ResponsiveTable/ResponsiveTable';
import { useCreateVehicle, useDeleteVehicle, useGetVehicles, useUpdateVehicle } from '@/store/server/useVehicles';
import { VehicleApplicationT } from '@/types/comingData/vehicles';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ColumnConfig } from '@/components/ResponsiveTable/types';
import { NormalizedErrorT } from '@/types/auth';
import DeleteConfirmationModal from '@/components/Modals/DeleteConfirmationModal';
import ErrorModal from '@/components/Modals/ErrorModal';
import LucideIconButton from '@/components/IconButton/LucideIconButton';
import VehicleFormModal from '@/components/Modals/forms/VehicleFormModal';
import ErrorScreen from '@/components/Screens/ErrorScreen';
import SplashScreen from '@/components/Screens/SplashScreen';



const Vehicles = () => {

  const { data, isPending, isError, refetch } = useGetVehicles();
  const mutationDelete = useDeleteVehicle()
  const mutationUpdate = useUpdateVehicle()
  const mutationAdd = useCreateVehicle()

  // 1. State to manage the Modal
  const [saveModalVisibility, setSaveModalVisibility] = React.useState(false);
  const [deleteModalVisiblity, setDeleteModalVisibility] = React.useState(false);
  const [selectedVehicle, setSelectedVehicle] = React.useState<VehicleApplicationT | null>(null);

  const [errorModalVisibility, setErrorModalVisibility] = React.useState(false)

  const [errorMessage, setErrorMessage] = React.useState<string>("")

  // 1. Add state to track the ID specifically for deletion
  const [vehicleToDelete, setVehicleToDelete] = React.useState<VehicleApplicationT | null>(null);



  const handleDelete = (id: any) => {
    setVehicleToDelete(id);
    setDeleteModalVisibility(true);
  };


  // 2. Handlers
  const handleEdit = (vehicle: VehicleApplicationT) => {
    setSelectedVehicle(vehicle); // Set the vehicle to be edited
    setSaveModalVisibility(true);       // Open modal
  };

  const handleAddNew = () => {
    // console.log(data)
    setSelectedVehicle(null);    // No vehicle means "Add Mode"
    setSaveModalVisibility(true);
  };


  const confirmDelete = () => {
    if (vehicleToDelete?.vehicleId) {
      console.log(vehicleToDelete)
      mutationDelete.mutate(vehicleToDelete?.vehicleId, {
        onSuccess: () => {
          setDeleteModalVisibility(false);
          setVehicleToDelete(null);
        },
        onError: (error: NormalizedErrorT) => {
          setDeleteModalVisibility(false)
          setErrorModalVisibility(true)
          setVehicleToDelete(null)
          setErrorMessage(error.message)
        }
      });
    }
  };
  const confirmAddandUpdate = (data: any, method: 'put' | 'post') => {
    if (method === 'put') {
      // We pass ONE object containing id and the rest of the data
      console.log("the data sended for update", data)
      const payloadData: VehicleApplicationT = {
        ...data,
        vehicleId: selectedVehicle?.vehicleId,
        companyApplicationId: selectedVehicle?.companyApplicationId
      }
      mutationUpdate.mutate(
        payloadData,
        {
          onSuccess: () => {
            setSaveModalVisibility(false);
            // TODO: Add toast success message here
          },
          onError: (error: NormalizedErrorT) => {
            // console.error("Update failed", error);
            // TODO: Open Error Modal here
            setErrorModalVisibility(true)
            setErrorMessage(error.message)
          }
        }
      );
    } else {
      mutationAdd.mutate(data, {
        onSuccess: () => {
          setSaveModalVisibility(false);
          // TODO: Add toast success message here
        },
        onError: (error: NormalizedErrorT) => {
          setErrorModalVisibility(true)
          setErrorMessage(error.message)

        }
      });
    }
  };



  // {isPending&&<SplashScreen/>}
  if (isPending) return (
    <SplashScreen />
  )

  if (isError) return (
    <ErrorScreen onRetry={refetch} />
  )

  // Manually define your columns to map labels to specific object keys
  const columns: ColumnConfig<VehicleApplicationT>[] = [
    { label: 'Vehicle Plate', key: 'plate' },
    { label: 'Brand', key: 'make' },
    { label: 'Model', key: 'model' },
    { label: 'Model Year', key: 'year' }, // Ensure 'year' exists in VehicleApplicationT
    { label: 'Chassis No', key: 'vin' },
    { label: 'Initial KM', key: 'firstKilometer' },
    { label: 'Has Driver?', key: 'isThereDriver' },
    { label: 'For Rent?', key: 'isItForRent' },
  ];

  return (
    <>
      <View
        style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5 }}>

        <LucideIconButton
          icon={"Plus"}
          text={'Create'}
          onPress={handleAddNew}
        />
      </View>

      <ResponsiveTable data={data} columns={columns} uniqueKey='plate' handleEdit={handleEdit} handleDelete={handleDelete} />

      <VehicleFormModal
        visible={saveModalVisibility}
        initialData={selectedVehicle}
        onClose={() => setSaveModalVisibility(false)}
        onSubmit={(data: any, method: "put" | "post") => confirmAddandUpdate(data, method)}
      />


      <DeleteConfirmationModal
        visible={deleteModalVisiblity}
        onClose={() => {
          setDeleteModalVisibility(false);
          setVehicleToDelete(null);
        }}
        onConfirm={confirmDelete}
        isDeleting={mutationDelete.isPending}



      />

      <ErrorModal
        visible={errorModalVisibility}
        onClose={() => {
          setErrorModalVisibility(false)
        }}
        message={errorMessage}
      />
    </>
  );
};



const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  editButton: { backgroundColor: '#007AFF' },
  deleteButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
})

export default Vehicles;