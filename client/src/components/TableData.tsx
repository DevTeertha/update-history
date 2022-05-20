import { TableCell, TableRow } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from './EditModal';
import { infoDataProps } from './interfaceAndTypes';
import { myContext } from '../App';
import { useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';

const TableData = ({
  row,
  handleEditOpen,
  editOpen,
  handleEditClose,
  style,
}: infoDataProps) => {
  const { deleteInfo, getInfo } = useContext(myContext);
  const [loading, setLoading] = useState(false);
  const handleDelete = async (id: any) => {
    if (id !== undefined) {
      setLoading(true);
      try {
        const result = await deleteInfo(id);
        if (result.status) {
          setLoading(false);
          alert('Deleted successfully');
          getInfo();
        } else {
          setLoading(false);
          alert('Cannot be updated');
        }
      } catch (error) {
        setLoading(false);
        alert('Internal Error!');
      }
    }
  };
  return (
    <>
      <EditModal
        row={row}
        style={style}
        editOpen={editOpen}
        handleEditClose={handleEditClose}
      />
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component='th' scope='row'>
          {row?.id}
        </TableCell>
        <TableCell align='left'>{row?.name}</TableCell>
        <TableCell align='left'>{row?.city}</TableCell>
        <TableCell align='left'>{row?.description}</TableCell>
        <TableCell align='left'>{row?.lat}</TableCell>
        <TableCell align='left'>{row?.lon}</TableCell>
        <TableCell align='left'>
          <Button
            onClick={() => handleEditOpen()}
            className='danger_btn_outline me-2'
            variant='outlined'
          >
            <EditIcon />
          </Button>
          <LoadingButton
            loading={loading}
            onClick={() => handleDelete(row.id)}
            color='error'
            variant='outlined'
          >
            <DeleteIcon />
          </LoadingButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableData;
