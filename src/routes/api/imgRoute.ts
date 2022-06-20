import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import imgResizing from '../../utilities/imgResizing';
import { Stats } from 'fs';

const imgRoute = express.Router();

imgRoute.get('/', async (req: Request, res: Response): Promise<void> => {
    const filename = req.query.name;
    // Check if height and width exist... if not put 100 as default value
    const height = req.query.height ? parseInt(req.query.height as string, 10) : 100;
    const width = req.query.width ? parseInt(req.query.width as string, 10) : 100;
    // console.log(filename +"--" + height + "--" + width);
    // check if the query is correct
    if (filename === "") {
        res.status(400).send('Please type valid filename within your url');
        return;
    }

    // get the full path from the filename
    const fullImagePath = `${path.resolve(__dirname, `../../../assets/full/${filename}`)}`;
    console.log(fullImagePath);
    // thumb path in the ${filename}-${height}x${width} format to save different dimensions
    const thumbImagePath = `${path.resolve(__dirname, `../../../assets/thumb/${filename}-${height}x${width}`)}`;

    // Check if filename exists in full folder


    const fullImage: Stats | null = await fs.stat(fullImagePath).catch(() => {
        res.status(404).send('Image does not exist');
        return null;
    });

    if (!fullImage) {
        return;
    }

    // Check if thumb was already created
    const existingThumb: Stats | null = await fs.stat(thumbImagePath).catch(() => {
        return null;
    });

    if (existingThumb) {
        fs.readFile(thumbImagePath)
            .then((thumbData: Buffer) => {
                res.status(200).contentType('jpg').send(thumbData);
            })
            .catch(() => {
                res.status(500).send('Error occured processing the image');
            });
    } else {
        // resize image
        imgResizing
            .resizeImage({
                fullImagePath,
                thumbImagePath,
                height,
                width,
            })
            .then((resizedImage: Buffer) => {
                res.status(200).contentType('jpg').send(resizedImage);
            })
            .catch(() => {
                res.status(500).send('Error occured processing the image');
            });
    }
});

export default imgRoute;
