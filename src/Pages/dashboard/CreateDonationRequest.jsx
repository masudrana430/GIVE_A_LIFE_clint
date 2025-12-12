// src/pages/dashboard/CreateDonationRequest.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner2nd from "../../Components/LoadingSpinner2nd";
import LoadingSpinnercopy from "../../Components/LoadingSpinnercopy";

// All 64 Districts sorted Alphabetically for easier Dropdown usage
const districtOptions = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", 
  "Brahmanbaria", "Chandpur", "Chapainawabganj", "Chattogram", "Chuadanga", 
  "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", 
  "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", 
  "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", 
  "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", 
  "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", 
  "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", 
  "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", 
  "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", 
  "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", 
  "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

const upazilaOptionsByDistrict = {
  // --- Barishal Division ---
  "Barguna": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"],
  "Barishal": ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barishal Sadar", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
  "Bhola": ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
  "Jhalokati": ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
  "Patuakhali": ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
  "Pirojpur": ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad (Swarupkathi)", "Pirojpur Sadar", "Zianagar (Indurkani)"],

  // --- Chattogram Division ---
  "Bandarban": ["Ali Kadam", "Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
  "Brahmanbaria": ["Akhaura", "Ashuganj", "Bancharampur", "Bijoynagar", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"],
  "Chandpur": ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
  "Chattogram": ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Karnaphuli", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda", "Chattogram Sadar"],
  "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"],
  "Cumilla": ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Cumilla Adarsha Sadar", "Cumilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Lalmai", "Manoharganj", "Meghna", "Muradnagar", "Nangalkot", "Titas"],
  "Feni": ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Fulgazi", "Parshuram", "Sonagazi"],
  "Khagrachhari": ["Dighinala", "Guimara", "Khagrachhari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
  "Lakshmipur": ["Kamalnagar", "Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati"],
  "Noakhali": ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Noakhali Sadar", "Senbagh", "Sonaimuri", "Subarnachar"],
  "Rangamati": ["Bagaichhari", "Barkal", "Belaichhari", "Juraichhari", "Kaptai", "Kaukhali", "Langadu", "Naniarchar", "Rajasthali", "Rangamati Sadar"],

  // --- Dhaka Division ---
  "Dhaka": ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar", "Tejgaon Circle", "Ramna Circle", "Mirpur Circle", "Dhanmondi Circle", "Gulshan Circle", "Lalbagh Circle"],
  "Faridpur": ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
  "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
  "Gopalganj": ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
  "Kishoreganj": ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
  "Madaripur": ["Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar", "Dasar"],
  "Manikganj": ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shivalaya", "Singair"],
  "Munshiganj": ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"],
  "Narayanganj": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
  "Narsingdi": ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
  "Rajbari": ["Baliakandi", "Goalandaghat", "Kalukhali", "Pangsha", "Rajbari Sadar"],
  "Shariatpur": ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zajira"],
  "Tangail": ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],

  // --- Khulna Division ---
  "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
  "Chuadanga": ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
  "Jashore": ["Abhaynagar", "Bagherpara", "Chaugachha", "Jashore Sadar", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
  "Jhenaidah": ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
  "Khulna": ["Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Terokhada", "Khulna Sadar"],
  "Kushtia": ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"],
  "Magura": ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
  "Meherpur": ["Gangni", "Meherpur Sadar", "Mujibnagar"],
  "Narail": ["Kalia", "Lohagara", "Narail Sadar"],
  "Satkhira": ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"],

  // --- Mymensingh Division ---
  "Jamalpur": ["Bakshiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
  "Mymensingh": ["Bhaluka", "Dhobaura", "Fulbaria", "Gafargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Mymensingh Sadar", "Muktagachha", "Nandail", "Phulpur", "Tara Khanda", "Trishal"],
  "Netrokona": ["Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"],
  "Sherpur": ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"],

  // --- Rajshahi Division ---
  "Bogura": ["Adamdighi", "Bogura Sadar", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"],
  "Chapainawabganj": ["Bholahat", "Chapainawabganj Sadar", "Gomastapur", "Nachol", "Shibganj"],
  "Joypurhat": ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
  "Naogaon": ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
  "Natore": ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Naldanga", "Natore Sadar", "Singra"],
  "Pabna": ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"],
  "Rajshahi": ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Tanore"],
  "Sirajganj": ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullahpara"],

  // --- Rangpur Division ---
  "Dinajpur": ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Fulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"],
  "Gaibandha": ["Fulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],
  "Kurigram": ["Bhurungamari", "Char Rajibpur", "Chilmari", "Kurigram Sadar", "Nageshwari", "Phulbari", "Rajarhat", "Raomari", "Ulipur"],
  "Lalmonirhat": ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
  "Nilphamari": ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
  "Panchagarh": ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
  "Rangpur": ["Badarganj", "Gangachhara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj"],
  "Thakurgaon": ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"],

  // --- Sylhet Division ---
  "Habiganj": ["Ajmiriganj", "Bahubal", "Baniyachong", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj", "Shayestaganj"],
  "Moulvibazar": ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"],
  "Sunamganj": ["Bishwamvarpur", "Chhatak", "Dakshin Sunamganj (Shantiganj)", "Derai", "Dharmapasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Madhyanagar", "Sullah", "Sunamganj Sadar", "Tahirpur"],
  "Sylhet": ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Osmani Nagar", "Sylhet Sadar", "Zakiganj"]
};
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const { dbUser, loadingDbUser } = useCurrentUser();
  const axiosSecure = useAxiosSecure();

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (loadingDbUser) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <LoadingSpinnercopy />
      </div>
    );
  }

  if (dbUser?.status === "blocked") {
    return (
      <div className="rounded-3xl border border-rose-100 shadow-xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-rose-700 flex items-center gap-2 mb-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-sm font-semibold">
            !
          </span>
          Create Donation Request
        </h2>
        <p className="text-sm text-rose-600">
          Your account is currently <span className="font-semibold">blocked</span>.
          You are not allowed to create new donation requests. Please contact an
          administrator if you believe this is a mistake.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    setLoading(true);

    const form = e.currentTarget;

    const payload = {
      requesterName: dbUser?.name || user?.displayName,
      requesterEmail: dbUser?.email || user?.email,
      recipientName: form.recipientName.value.trim(),
      recipientDistrict: form.recipientDistrict.value,
      recipientUpazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value.trim(),
      fullAddress: form.fullAddress.value.trim(),
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value.trim(),
    };

    try {
      const res = await axiosSecure.post("/donation-requests", payload);

      // if your backend returns something different, adapt this condition
      if (!res.data) {
        throw new Error("Unexpected server response.");
      }

      setSuccess("Donation request created successfully.");
      form.reset();
      setSelectedDistrict("");
      setSelectedUpazila("");
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create request.";
      setErr(message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setErr("");
        setSuccess("");
      }, 2500);
    }
  };

  return (
    <div className="rounded-3xl shadow-2xl border border-slate-100 bg-base-100 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            New request
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Create Donation Request
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-xl">
            Provide the patient&apos;s details and location so nearby donors can
            respond quickly and safely.
          </p>
        </div>

        <div className="hidden md:flex flex-col items-end text-xs text-slate-500">
          <span>
            Requester information is read-only and comes from your profile.
          </span>
          <span className="mt-1 inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Only active users can create requests.
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {/* Requester info (readonly) */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Requester Name
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered rounded-xl bg-slate-50 cursor-not-allowed"
            value={dbUser?.name || user?.displayName || ""}
            readOnly
          />
        </div>

        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Requester Email
            </span>
          </label>
          <input
            type="email"
            className="input input-bordered rounded-xl bg-slate-50 cursor-not-allowed"
            value={dbUser?.email || user?.email || ""}
            readOnly
          />
        </div>

        {/* Recipient name */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recipient Name
            </span>
          </label>
          <input
            type="text"
            name="recipientName"
            className="input input-bordered rounded-xl"
            placeholder="Patient / recipient full name"
            required
          />
        </div>

        {/* District */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recipient District
            </span>
          </label>
          <select
            name="recipientDistrict"
            className="select select-bordered rounded-xl"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedUpazila("");
            }}
            required
          >
            <option value="" disabled>
              Select district
            </option>
            {districtOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recipient Upazila
            </span>
          </label>
          <select
            name="recipientUpazila"
            className="select select-bordered rounded-xl"
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
            required
            disabled={!selectedDistrict}
          >
            <option value="" disabled>
              {selectedDistrict ? "Select upazila" : "Select district first"}
            </option>
            {selectedDistrict &&
              (upazilaOptionsByDistrict[selectedDistrict] || []).map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
          </select>
        </div>

        {/* Hospital */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Hospital Name
            </span>
          </label>
          <input
            type="text"
            name="hospitalName"
            className="input input-bordered rounded-xl"
            placeholder="e.g. Dhaka Medical College Hospital"
            required
          />
        </div>

        {/* Full address (full width) */}
        <div className="form-control md:col-span-2">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Full Address
            </span>
          </label>
          <input
            type="text"
            name="fullAddress"
            className="input input-bordered rounded-xl"
            placeholder="Street, area, and any helpful directions"
            required
          />
        </div>

        {/* Blood group */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Required Blood Group
            </span>
          </label>
          <select
            name="bloodGroup"
            className="select select-bordered rounded-xl"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select blood group
            </option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Donation Date
            </span>
          </label>
          <input
            type="date"
            name="donationDate"
            className="input input-bordered rounded-xl"
            required
          />
        </div>

        {/* Time */}
        <div className="form-control">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Donation Time
            </span>
          </label>
          <input
            type="time"
            name="donationTime"
            className="input input-bordered rounded-xl"
            required
          />
        </div>

        {/* Message */}
        <div className="form-control md:col-span-2">
          <label className="label pb-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide text-slate-500">
              Request Message
            </span>
          </label>
          <textarea
            name="requestMessage"
            className="textarea textarea-bordered rounded-2xl min-h-[120px]"
            placeholder="Explain why blood is needed, patient condition, and any special instructions for donors."
            rows={4}
            required
          />
        </div>

        {err && (
          <p className="text-error text-sm md:col-span-2 mt-1">
            {err}
          </p>
        )}
        {success && (
          <p className="text-success text-sm md:col-span-2 mt-1">
            {success}
          </p>
        )}

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            className="btn rounded-full border-0 bg-gradient-to-r from-[#DC2626] via-[#EA384D] to-[#F97316] text-white font-semibold px-8 shadow-lg shadow-red-300/60 hover:shadow-red-400/80 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;

