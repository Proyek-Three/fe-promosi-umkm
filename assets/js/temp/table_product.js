export let isiTabel =
`
 <tbody
                    class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                  >
                    <tr class="text-gray-700 dark:text-gray-400">
                      <td class="px-4 py-3 text-sm">#PRODUCTNAME#</td>
                      <td class="px-4 py-3 text-sm">#CATEGORYNAME#</td>
                      <td class="px-4 py-3 text-sm">#DESCRIPTION#</td>
                      <td class="px-4 py-3 text-sm">#PRICE#</td>
                      <td class="px-4 py-3">
                        <img
                          src="#IMAGE#"
                          alt="ProductImage"
                          class="w-20 h-20 object-cover rounded-lg"
                        />
                      </td>
                      <td class="px-4 py-3 text-center">
                        <div class="flex items-center justify-center space-x-4">
                          <!-- Dropdown untuk status -->
                          <select
                            id="status"
                            class="block w-40 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onchange="updateDropdownColor(this)"
                          >
                            <option selected disabled>Select a Status</option>
                            <option value="diterima">Accepted</option>
                            <option value="ditolak">Rejected</option>
                          </select>
                          <!-- Tombol Delete -->
                          <button
                            class="flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                            aria-label="Delete"
                            id="del_button"
                            onclick="confirmDelete('#IDHAPUS#')"
                          >
                            <i class="fa-solid fa-trash mr-2"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
`