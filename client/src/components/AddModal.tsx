import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useContext, useRef, useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Button, TextField } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { myContext } from '../App';

const AddModal = ({ addOpen, handleAddClose, style }: any) => {
  const { addInfo, getInfo } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = useRef<any>();
  const handleAddSubmit = async (data: any) => {
    setLoading(true);
    const id = uuidv4().slice(0, 5);
    try {
      const result = await addInfo({ id, ...data });
      if (result.status) {
        alert('Added successfully');
        handleAddClose();
        getInfo();
      } else {
        alert('Cannot be added');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Internal Error!');
    }
    formRef.current.reset();
  };
  return (
    <Modal
      open={addOpen}
      onClose={handleAddClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <form ref={formRef} onSubmit={handleSubmit(handleAddSubmit)}>
          <LoadingButton type='submit' loading={loading} variant='outlined'>
            <SaveRoundedIcon /> Save
          </LoadingButton>
          <Button
            onClick={handleAddClose}
            color='error'
            className='ms-2'
            variant='outlined'
          >
            <CloseRoundedIcon /> Cancel
          </Button>
          <hr />
          <TextField
            {...register('name', { required: true })}
            className='w-100 my-2'
            label='Name'
            variant='outlined'
          />
          {errors?.name?.type === 'required' && (
            <p className='text-danger m-0'>Name is required!</p>
          )}
          <TextField
            {...register('city', { required: true })}
            className='w-100 my-2'
            label='Jurisdiction/City/Regios'
            variant='outlined'
          />
          {errors?.city?.type === 'required' && (
            <p className='text-danger m-0'>City is required!</p>
          )}
          <TextField
            {...register('description', { required: true })}
            className='w-100 my-2'
            label='Site Description'
            variant='outlined'
          />
          {errors?.description?.type === 'required' && (
            <p className='text-danger m-0'>Description is required!</p>
          )}
          <Row>
            <Col sm={12} md={6}>
              <TextField
                {...register('lat', { required: true })}
                className='my-2'
                label='Latitude'
                variant='outlined'
              />
              {errors?.lat?.type === 'required' && (
                <p className='text-danger m-0'>Latitude is required!</p>
              )}
            </Col>
            <Col sm={12} md={6}>
              {' '}
              <TextField
                {...register('lon', { required: true })}
                className='my-2'
                label='Longitude'
                variant='outlined'
              />
              {errors?.lon?.type === 'required' && (
                <p className='text-danger m-0'>Longitude is required!</p>
              )}
            </Col>
          </Row>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
