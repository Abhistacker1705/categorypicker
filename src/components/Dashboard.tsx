"use client";
import React, { useState } from "react";
import { trpc } from "~/app/_trpc/client";
import Pagination from "./Pagination";
import useAuth from "~/hooks/useAuth";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { user, userid } = useAuth();

  const [selectedCategories, setSelectedCategories] = useState<Array<number>>(
    [],
  );
  const onPageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const { data, isLoading, isFetching } = trpc.getCategories.useQuery({
    page: pageNumber,
  });

  trpc.getUserCategories.useQuery(
    {
      email: user ? user : "",
    },
    {
      enabled: !!user,
      onSuccess: (data) => {
        const categoryIds = data.map((category) => category.id);
        setSelectedCategories(categoryIds);
      },
    },
  );

  const loading = isLoading || isFetching;

  return (
    <div className="form-border-pad-layout">
      <h2 className="self-center text-2xl font-semibold">
        Please mark your interests!
      </h2>
      <p className="self-center">We will keep you notified.</p>
      <div>
        <p>My saved interests!</p>
      </div>
      {loading ? (
        <div className="flex h-32 items-center justify-center self-center justify-self-center">
          <span className="loader border-black border-b-transparent"></span>
        </div>
      ) : (
        <>
          <div className="flexy-col-gap-2">
            {data?.map((category) => (
              <ListElement
                key={category.id}
                category={category}
                userCategories={selectedCategories ? selectedCategories : []}
                setUserCategories={setSelectedCategories}
                userId={Number(userid)}
              />
            ))}
          </div>
          <Pagination
            totalPages={Math.ceil(100 / 6)}
            currentPage={pageNumber}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;

const ListElement = ({
  category,
  userCategories,
  userId,
  setUserCategories,
}: {
  category: { name: string; id: number };
  userCategories: Array<number>;
  userId: number;
  setUserCategories: React.Dispatch<React.SetStateAction<Array<number>>>;
}) => {
  const { mutate: updateCategories, isLoading } =
    trpc.updateUserCategories.useMutation();

  return (
    <div className="flex gap-3">
      <input
        className="cursor-pointer checked:bg-black checked:text-white"
        id={category.name}
        onChange={async () => {
          setUserCategories((prev: Array<number>) => [...prev, category.id]);
          updateCategories(
            {
              userId,
              selectedCategoryIds: category.id,
            },
            {
              onSuccess: () => {
                toast.success("Updated user Category.");
              },
              onError: () => {
                toast.error("Error updating user category.");
              },
            },
          );
        }}
        checked={userCategories.includes(category.id)}
        type="checkbox"
      />
      <label htmlFor={category.name} className="">
        {category.name}
      </label>
    </div>
  );
};
