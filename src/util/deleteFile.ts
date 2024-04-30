export const deleteFile = (file: string) => {

  return fetch(`http://localhost:5000/delete?path=${file}`,
    {
      method: 'delete'

    },)
};
