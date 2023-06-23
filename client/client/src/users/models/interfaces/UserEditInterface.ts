import AddressInterface from "../../../cards/models/interfaces/AddressInterface";
import ImageInterface from "../../../cards/models/interfaces/ImageInterface";

interface UserEditInterface  {
    name: { first: string; middle?: string | undefined; last: string };
    phone: string;
    email: string;
    image: ImageInterface;
    address: AddressInterface;
    isBusiness: boolean;
    isAdmin: boolean;
    _id: string;
  }
  export default UserEditInterface