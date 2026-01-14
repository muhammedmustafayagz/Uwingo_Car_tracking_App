import ResponsiveTable from '@/components/ResponsiveTable/ResponsiveTable';

import { NormalizedErrorT } from '@/types/auth';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import LucideIconButton from '@/components/IconButton/LucideIconButton';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
import ErrorModal from '@/components/Modals/ErrorModal';
import { ColumnConfig } from '@/components/ResponsiveTable/types';
import ErrorScreen from '@/components/Screens/ErrorScreen';
import SplashScreen from '@/components/Screens/SplashScreen';


import { useCreateDriver, useDeleteDriver, useGetDrivers, useUpdateDriver } from '@/store/server/useDrivers';
import { DriverApplicationT } from '@/types/comingData/drivers';
import DriverFormModal from '@/components/Modals/forms/DriverFormModal';






const Drivers = () => {

  const { data, isPending, isError, refetch, error } = useGetDrivers();
  const mutationDelete = useDeleteDriver()
  const mutationUpdate = useUpdateDriver()
  const mutationAdd = useCreateDriver()

  // 1. State to manage the Modal
  const [saveModalVisibility, setSaveModalVisibility] = React.useState(false);
  const [deleteModalVisiblity, setDeleteModalVisibility] = React.useState(false);
  const [errorModalVisibility, setErrorModalVisibility] = React.useState(false)


  const [selectedDriver, setSelectedDriver] = React.useState<DriverApplicationT | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  // 1. Add state to track the ID specifically for deletion
  const [driverToDelete, setDriverToDelete] = React.useState<DriverApplicationT | null>(null);



  const handleDelete = (id: any) => {
    setDriverToDelete(id);
    setDeleteModalVisibility(true);
  };


  // 2. Handlers
  const handleEdit = (driver: DriverApplicationT) => {
    setSelectedDriver(driver); // Set the vehicle to be edited
    setSaveModalVisibility(true);       // Open modal
  };

  const handleAddNew = () => {
    // console.log(data)
    setSelectedDriver(null);    // No vehicle means "Add Mode"
    setSaveModalVisibility(true);
  };


  const confirmDelete = () => {
    if (driverToDelete?.driverId) {
      console.log(driverToDelete)
      mutationDelete.mutate(driverToDelete?.driverId, {
        onSuccess: () => {
          setDeleteModalVisibility(false);
          setDriverToDelete(null);
        },
        onError: (error: NormalizedErrorT) => {
          setDeleteModalVisibility(false)
          setErrorModalVisibility(true)
          setDriverToDelete(null)
          setErrorMessage(error.message)
        }
      });
    }
  };
  const confirmAddandUpdate = (data: any, method: 'put' | 'post') => {
    console.log('hello from add ')
    console.log('method : ', method, "data", data)
    const payloadData: DriverApplicationT = {
      ...data,
      companyApplicationId: selectedDriver?.companyApplicationId,
      driverId: selectedDriver?.driverId
    }
    if (method === 'put') {
      // We pass ONE object containing id and the rest of the data
      console.log("the data sended for update", payloadData)
      mutationUpdate.mutate(
        payloadData,
        {
          onSuccess: () => {
            setSaveModalVisibility(false);
            // TODO: Add toast success message here
          },
          onError: (error: NormalizedErrorT) => {

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
    <ErrorScreen onRetry={refetch} message={error.message} />
  )

  // Manually define your columns to map labels to specific object keys
  const columns: ColumnConfig<DriverApplicationT>[] = [
    { label: 'Driver Name', key: 'driverName' },
    { label: 'Driver Code', key: 'driverCode' },
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

      <ResponsiveTable data={data} columns={columns} uniqueKey='driverId' handleEdit={handleEdit} handleDelete={handleDelete} />

      <DriverFormModal
        visible={saveModalVisibility}
        initialData={selectedDriver}
        onClose={() => setSaveModalVisibility(false)}
        onSubmit={(data, method) => confirmAddandUpdate(data, method)}
      />


      <DeleteConfirmationModal
        visible={deleteModalVisiblity}
        onClose={() => {
          setDeleteModalVisibility(false);
          setDriverToDelete(null);
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

export default Drivers;