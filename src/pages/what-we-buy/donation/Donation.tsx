import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@rsces/components/form/InputField';
import Textarea from '@rsces/components/form/Textarea';
import { useCreateDonation } from '@rsces/service/service-donation';
import { toFormData } from 'axios';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { BsUpload } from 'react-icons/bs';
import { defaultValues, schema } from './constant';

const Donation = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const {
    control,
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  
  const { mutateAsync: createDonation, isPending: isCreatingDonation } =
    useCreateDonation();

  const onSubmit = async (data: typeof defaultValues) => {
    const pickUpTime = new Date(
      data.pickUpDate + 'T' + data.pickUpTime,
    ).toISOString();
    const formattedData = {
      ...data,
      pickUpTime,
    };
    const formdata = toFormData(formattedData, undefined, {
      indexes: null,
    });    
    await createDonation(formdata);
    reset(defaultValues);
  };

  return (
    <Grid
      as={'form'}
      templateColumns={'repeat(2, 1fr)'}
      columnGap={6}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        name="name"
        label="Name"
        placeholder={'Your Name'}
        control={control}
        errors={errors}
      />
      <InputField
        name="phoneNumber"
        label="Phone Number"
        placeholder="Your Phone Number"
        control={control}
        errors={errors}
      />
      <InputField
        name="itemName"
        label="Item"
        placeholder="Enter Item name"
        control={control}
        errors={errors}
      />
      <InputField
        type="date"
        name="pickUpDate"
        label="Pickup Date"
        placeholder="Schedule for Pickup date"
        control={control}
        errors={errors}
      />
      <GridItem rowSpan={3}>
        <FormControl h={'full'}>
          <Input
            type="file"
            display={'none'}
            {...register('image')}
            ref={(e) => {
              register('image').ref(e);
              imageRef.current = e;
            }}
          />
          <FormLabel fontSize={'sm'}>Item (Image)</FormLabel>
          <Button
            width={'full'}
            variant={'outline'}
            onClick={() => imageRef.current?.click()}
          >
            <HStack spacing={2}>
              <BsUpload />
              <Text>Upload</Text>
            </HStack>
          </Button>
          {watch('image')?.[0] && (
            <Image
              src={
                watch('image')
                  ? URL.createObjectURL(watch('image')?.[0] || '')
                  : ''
              }
              alt="Item image"
              h={48}
              mt={2}
              mx={'auto'}
            />
          )}
        </FormControl>
      </GridItem>
      <InputField
        type="time"
        name="pickUpTime"
        label="Pickup Time"
        placeholder="Time for pickup"
        control={control}
        errors={errors}
      />
      <Textarea
        name="description"
        label="Description"
        placeholder="Note (if any)"
        control={control}
      />
      <Button
        mt={4}
        type="submit"
        w={'160px'}
        justifySelf={'flex-end'}
        isLoading={isCreatingDonation}
      >
        Submit
      </Button>
    </Grid>
  );
};

export default Donation;
