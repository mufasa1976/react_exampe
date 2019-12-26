import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  useEffect(() => {
    console.info(`mounted with id ${id}`);
    return () => {
      console.info(`unmounted with id ${id}`);
    };
  }, [id]);

  if (!id || !["123", "456"].includes(id)) {
    return <Redirect to="/not-found" />;
  }

  return (
    <div>
      <div>Detail: {id}</div>
      <FontAwesomeIcon icon={faCoffee} />
    </div>
  );
};

export default Detail;
