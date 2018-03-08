import {
  DATA_MODELS,
  DATA_MODELS_P1,
  DATA_MODELS_P2,
  DATA_MODELS_P3,
  ERROR,
} from 'test/mocks/dataModels';
import throttle from 'util/throttle';


export const getDataModels = type => (
  new Promise((resolve, reject) => {
    if (type.errors) {
      throttle(() => resolve(DATA_MODELS.payload));
    } else {
      reject(ERROR);
    }
  })
);


export const getDataModelsPaged = (page = 1) => new Promise((resolve) => {
  switch (page) {
    case 1:
      resolve(DATA_MODELS_P1);
      break;
    case 2:
      resolve(DATA_MODELS_P2);
      break;
    case 3:
      resolve(DATA_MODELS_P3);
      break;
    default:
      resolve(DATA_MODELS_P1);
  }
});
