"use client";
import React, { FC } from "react";

type Props = {
  data: any;
  setShouldFetch: (shouldFetch: boolean) => void;
};

const Backgrounds: FC<Props> = ({ data, setShouldFetch }) => {
  return <div>Backgrounds</div>;
};

export default Backgrounds;
