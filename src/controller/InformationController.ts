import { Request, Response } from 'express';
import { docClient } from '../dbConfig';

export const getInfo = async (req: Request, res: Response) => {
  try {
    var params = {
      TableName: 'audit_information',
    };
    var result = await docClient.scan(params).promise();
    res.send({ status: true, message: `Successfull`, data: result.Items });
  } catch (error) {
    res.send({ status: false, message: `Failed` });
  }
};

export const postInfo = (req: Request, res: Response) => {
  try {
    const params = {
      TableName: 'audit_information',
      Item: {
        id: req.body.id,
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        lat: req.body.lat,
        lon: req.body.lon,
      },
    };
    docClient.put(params, function (err: any, data: any) {
      if (err) {
        res.send({ status: false, message: `Something went wrong!` });
      } else {
        res.send({
          status: true,
          message: `${req.body.name} Successfully added`,
        });
      }
    });
  } catch (error) {
    res.send({ status: false, message: `Something went wrong!` });
  }
};

export const editInfo = async (req: Request, res: Response) => {
  try {
    console.log('edit hit: ', req.body.id);
    var params = {
      TableName: 'audit_information',
      Key: {
        id: req.body.id,
      },
      UpdateExpression:
        'set #name = :name, #city = :city, #description = :description, #lat = :lat, #lon = :lon',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#description': 'description',
        '#city': 'city',
        '#lat': 'lat',
        '#lon': 'lon',
      },
      ExpressionAttributeValues: {
        ':name': req.body.name,
        ':city': req.body.city,
        ':description': req.body.description,
        ':lat': req.body.lat,
        ':lon': req.body.lon,
      },
    };
    docClient.update(params, (err: any, data: any) => {
      if (err) {
        res.send({ status: false, message: `Cannot be update` });
      } else {
        res.send({
          status: true,
          message: `${req.body.id} Updated Successfully`,
        });
      }
    });
  } catch (error) {
    res.send({ status: false, message: `Something went wrong!` });
  }
};

export const deleteInfo = async (req: Request, res: Response) => {
  try {
    var params = {
      TableName: 'audit_information',
      Key: {
        id: req.body.id,
      },
    };
    docClient.delete(params, (err: any, data: any) => {
      if (err) {
        res.send({ status: false, message: `Cannot be delete` });
      } else {
        res.send({
          status: true,
          message: `${req.body.id} Deleted Successfully`,
        });
      }
    });
  } catch (error) {
    res.send({ status: false, message: `Something went wrong!` });
  }
};
