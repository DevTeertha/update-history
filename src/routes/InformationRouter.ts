import { Router } from 'express';
import { deleteInfo, editInfo, getInfo, postInfo } from '../controller/InformationController';

const InformationRouter: Router = Router();

InformationRouter.get('/getInfo', getInfo);
InformationRouter.post('/postInfo', postInfo);
InformationRouter.put('/editInfo', editInfo);
InformationRouter.delete('/deleteInfo', deleteInfo);

export default InformationRouter;
