import path from 'path';
import imageResizing from '../../utilities/imgResizing';

const thumbImagePath = path.resolve(__dirname, '../../../assets/thumb/fjord');

describe('The imageResizer function', (): void => {
  it('Expect transform to throw specific error', async (): Promise<void> => {
    await expectAsync(
      imageResizing.resizeImage({
        height: 100,
        width: 150,
        fullImagePath: '',
        thumbImagePath,
      })
    ).toBeRejected();
  });
});
