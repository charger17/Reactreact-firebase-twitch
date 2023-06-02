import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useForm } from "react-hook-form";

import ButtonLoading from "../components/ButtonLoading";
import Title from "../components/Title";
import Button from "../components/Button";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {
  const { required, patternURL } = formValidate();

  const [copy, setCopy] = useState({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    setError,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) {
    return <ButtonLoading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        console.log(newOriginID);
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = async (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const pathURL = window.location.href;

  const handleClickCopy = async(nanoid) =>{
    await navigator.clipboard.writeText(window.location.href + nanoid)
    setCopy({ [nanoid]: true})
  }

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit(onSubmit)} className="m-2">
        <FormInput
          type="text"
          placeholder="Ingrese URL"
          {...register("url", {
            required,
            pattern: patternURL,
          })}
          label="Ingresa tu URL"
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInput>
        {newOriginID ? (
          <Button
            text="Edit Url"
            type="submit"
            color="gray"
            loading={loading.updateData}
          />
        ) : (
          <Button
            text="ADD URL"
            type="submit"
            color="blue"
            loading={loading.addData}
          />
        )}
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <div className="flex space-x-4">
            <Button
              text="Delete"
              type="button"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />

            <Button
              text="Edit"
              type="button"
              color="green"
              onClick={() => handleClickEdit(item)}
            />

            <Button
              text={copy[item.nanoid] ? "Copied" :  "Copy"}
              type="button"
              color="blue"
              onClick={() => handleClickCopy(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
