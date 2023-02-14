export type apiGetItensContent = {
  itens: {
    Content: [
      {
        key: string;
        itemName: string;
        storageClass: string;
        size: any;
        type:string;
        LastModified: string ;
      }
    ];
  };
};

export type content = {
  key: string;
  itemName: string;
  storageClass: string;
  size: any;
  type:string;
  LastModified: string ;
};
