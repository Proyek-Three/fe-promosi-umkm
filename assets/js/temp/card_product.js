export let isiCard =
`
 <div
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="p-8 rounded-t-lg"
                src="#IMAGE#"
                alt="Product Image"
              />
            </a>
            <div class="px-5 pb-5">
                <h3
                  class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  #PRODUCTNAME#
                </h3>
                <h6>#CATEGORYNAME#</h6>
                <p class="text-xl dark:text-white">
                  #DESCRIPTION#
                </p>
                 <!-- Status Badge -->
                 <div class="mt-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                  <div class="inline-flex items-center gap-2 bg-blue-100 text-dark-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-dark-900 dark:text-dark-300">
                    #STATUS#
                  </div>
                </div>
              <div class="flex items-center justify-between">
                <span
                  class="mt-2 text-2xl font-bold text-gray-900 dark:text-white"
                  >Rp. #PRICE#</span
                > 
              </div>
              <br>
              <a
                href="edit.html?categoryId=#IDEDIT#"
                class="mt-2 text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:focus:ring-yellow-500"
                ><i class="fa-solid fa-pen-to-square"></i> Edit</a
              >
              <a
                id="del_button"
                onclick="confirmDelete('#IDHAPUS#')"
                class="mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                ><i class="fa-solid fa-trash"></i> Delete</a
              >
          </div>
            </div>
`