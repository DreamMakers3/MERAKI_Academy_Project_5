import React from "react";

const PostLoader = () => {
  return (
    <div className="container relative" style={{ width: "600px" }}>
      <div
        class="border mt-2 shadow rounded-md p-5 h-56 mx-auto bg-slate-50 justify-center"
        style={{ width: "600px" }}
      >
        <div
          class="animate-pulse flex-col space-x-4 justify-center"
          style={{ width: "540px" }}
        >
          <div className="flex">
            <div class="rounded-full bg-slate-300 h-10 w-10 ms-2"></div>
            <div class="h-2 ms-2 mt-3 bg-slate-300 rounded w-28"></div>
          </div>

          <div class="flex-1 space-y-6 py-1 mt-2">
            <div class="space-y-3">
              <div class="h-2 bg-slate-300 rounded col-span-2"></div>

              <div class="h-2 bg-slate-300 rounded w-48"></div>
              <div class="h-24 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <>
        <div
          class="border mt-4 shadow rounded-md p-5 h-56 mx-auto bg-slate-50 justify-center"
          style={{ width: "650px" }}
        >
          <div
            class="animate-pulse flex-col space-x-4 justify-center"
            style={{ width: "540px" }}
          >
            <div className="flex">
              <div class="rounded-full bg-slate-300 h-10 w-10 ms-2"></div>
              <div class="h-2 ms-2 mt-3 bg-slate-300 rounded w-28"></div>
            </div>

            <div class="flex-1 space-y-6 py-1 mt-2">
              <div class="space-y-3">
                <div class="h-2 bg-slate-300 rounded col-span-2"></div>

                <div class="h-2 bg-slate-300 rounded w-48"></div>
                <div class="h-24 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default PostLoader;
