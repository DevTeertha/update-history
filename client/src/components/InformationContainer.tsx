import { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import AddModal from './AddModal';
import Loader from './Loader';
import TableData from './TableData';
import { infoDataI } from './interfaceAndTypes';
import { myContext } from '../App';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const InformationContainer = () => {
  const { infoState, loadingState } = useContext(myContext);
  const [info] = infoState;
  const [loading] = loadingState;
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  return (
    <section style={{ padding: '3em 0' }}>
      <AddModal
        style={style}
        addOpen={addOpen}
        handleAddClose={handleAddClose}
      />
      ;{loading && <Loader />}
      <Container maxWidth='lg'>
        <Button className='my-4' onClick={handleAddOpen} variant='contained'>
          <AddIcon className='me-2' /> Add
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell className='fw-bold'>ID</TableCell>
                <TableCell className='fw-bold' align='left'>
                  Name
                </TableCell>
                <TableCell className='fw-bold' align='left'>
                  City/Region
                </TableCell>
                <TableCell className='fw-bold' align='left'>
                  Descr
                </TableCell>
                <TableCell className='fw-bold' align='left'>
                  Lat
                </TableCell>
                <TableCell className='fw-bold' align='left'>
                  Lon
                </TableCell>
                <TableCell className='fw-bold' align='left'>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.data.map((row: infoDataI, key: number) => (
                <TableData
                  key={key}
                  style={style}
                  editOpen={editOpen}
                  row={row}
                  handleEditOpen={handleEditOpen}
                  handleEditClose={handleEditClose}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </section>
  );
};

export default InformationContainer;
