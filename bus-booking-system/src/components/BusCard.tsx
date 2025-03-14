import { Bus } from "../types";
import { format } from "date-fns";

interface BusCardProps {
  bus: Bus;
  onSelect: (busId: string) => void;
}

export function BusCard({ bus, onSelect }: BusCardProps) {
  const styles = {
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
    },
    busName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
    },
    busType: {
      fontSize: "14px",
      color: "#6B7280",
      backgroundColor: "#F3F4F6",
      padding: "4px 8px",
      borderRadius: "4px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      marginBottom: "16px",
    },
    infoItem: {
      display: "flex",
      flexDirection: "column" as const,
    },
    label: {
      fontSize: "14px",
      color: "#6B7280",
      marginBottom: "4px",
    },
    value: {
      fontSize: "16px",
      color: "#111827",
      fontWeight: "500",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "16px",
      paddingTop: "16px",
      borderTop: "1px solid #E5E7EB",
    },
    price: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#111827",
    },
    button: {
      backgroundColor: "#4F46E5",
      color: "white",
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
    },
    amenities: {
      display: "flex",
      gap: "8px",
      marginTop: "12px",
    },
    amenity: {
      fontSize: "12px",
      color: "#6B7280",
      backgroundColor: "#F3F4F6",
      padding: "2px 8px",
      borderRadius: "12px",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.busName}>{bus.name}</h3>
        <span style={styles.busType}>{bus.type}</span>
      </div>

      <div style={styles.infoGrid}>
        <div style={styles.infoItem}>
          <span style={styles.label}>From</span>
          <span style={styles.value}>{bus.source}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>To</span>
          <span style={styles.value}>{bus.destination}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Departure</span>
          <span style={styles.value}>
            {format(new Date(bus.departureTime), "hh:mm a")}
          </span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Arrival</span>
          <span style={styles.value}>
            {format(new Date(bus.arrivalTime), "hh:mm a")}
          </span>
        </div>
      </div>

      {bus.amenities && bus.amenities.length > 0 && (
        <div style={styles.amenities}>
          {bus.amenities.map((amenity) => (
            <span key={amenity} style={styles.amenity}>
              {amenity}
            </span>
          ))}
        </div>
      )}

      <div style={styles.footer}>
        <div>
          <span style={styles.label}>Available Seats</span>
          <div style={styles.value}>{bus.availableSeats}</div>
        </div>
        <div style={{ textAlign: "right" as const }}>
          <div style={styles.price}>₹{bus.fare}</div>
          <button style={styles.button} onClick={() => onSelect(bus.id)}>
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
}
