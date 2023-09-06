const pollApi = ({
  apiFn, stopPollingConditionFn, timeout = 5000, interval = 3000, stepFunction,
}) => {
  const endTime = Number(new Date()) + timeout;
  const checkCondition = (resolve, reject) => {
    apiFn().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (stepFunction) {
            stepFunction(data.payload || {});
          }
          if (stopPollingConditionFn && stopPollingConditionFn(data)) {
            resolve(data);
          } else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject);
          } else {
            const { errors, ...otherResponse } = data;
            reject({
              errors: [...errors, { message: 'Polling timed out' }],
              ...otherResponse,
            });
          }
        });
      } else {
        reject(response);
      }
    }).catch((error) => {
      reject(error);
    });
  };
  return new Promise(checkCondition);
};

export default pollApi;
