export async function asyncMap(asyncFun, arr){
  for(let i = 0; i < arr.length; i++){
    await asyncFun(arr[i]);
  }
}
