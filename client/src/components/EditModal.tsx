import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Button, TextField } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { myContext } from '../App';

const EditModal = ({ style, editOpen, handleEditClose, row }: any) => {
  const { getInfo, editInfo } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleEditSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await editInfo({ id: row?.id, ...data });
      if (result.status) {
        alert('Updated successfully');
        handleEditClose();
        getInfo();
      } else {
        alert('Cannot be updated');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Internal Error!');
    }
  };
  return (
    <Modal
      open={editOpen}
      onClose={handleEditClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <form
          className='modal_container'
          onSubmit={handleSubmit(handleEditSubmit)}
        >
          <LoadingButton type='submit' loading={loading} variant='outlined'>
            <SaveRoundedIcon /> Save
          </LoadingButton>
          <Button
            onClick={handleEditClose}
            className='ms-2 text-dark border-dark'
            variant='outlined'
          >
            <CloseRoundedIcon /> Cancel
          </Button>
          <hr />
          <p>Site Id: {row?.id}</p>
          <TextField
            {...register('name', { required: true })}
            className='w-100 my-2'
            label='Name'
            variant='outlined'
            defaultValue={row?.name}
          />
          {errors?.name?.type === 'required' && (
            <p className='text-danger'>Name is required!</p>
          )}
          <TextField
            {...register('city', { required: true })}
            className='w-100 my-2'
            label='Jurisdiction/City/Regios'
            variant='outlined'
            defaultValue={row?.city}
          />
          {errors?.city?.type === 'required' && (
            <p className='text-danger'>City is required!</p>
          )}
          <TextField
            {...register('description', { required: true })}
            className='w-100 my-2'
            label='Site Description'
            variant='outlined'
            defaultValue={row?.description}
          />
          {errors?.description?.type === 'required' && (
            <p className='text-danger'>Description is required!</p>
          )}
          <Row>
            <Col sm={12} md={6}>
              <TextField
                {...register('lat', { required: true })}
                className='my-2'
                label='Latitude'
                variant='outlined'
                defaultValue={row?.lat}
              />
              {errors?.lat?.type === 'required' && (
                <p className='text-danger'>Latitude is required!</p>
              )}
            </Col>
            <Col sm={12} md={6}>
              {' '}
              <TextField
                {...register('lon', { required: true })}
                className='my-2'
                label='Longitude'
                variant='outlined'
                defaultValue={row?.lon}
              />
              {errors?.lon?.type === 'required' && (
                <p className='text-danger'>Longitude is required!</p>
              )}
            </Col>
          </Row>
        </form>
        <div className='mt-2 audit_log_container p-3'>
          <h6 className='text-secondary'>Audit Log:</h6>
          <hr />
          <p className='m-0'>Created by Simon on 2/1/2020, 12:00:00 AM</p>
          <p className='m-0'>Updated by Nandita on 1/12/2021, 11:00:50 PM</p>
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
