import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'; // Required for react-grid-layout
import 'react-resizable/css/styles.css'; // Required for resizing capabilities
import './MyGrid.css'; // Import CSS specific to MyGrid

const MyGrid = forwardRef((props, ref) => {
  const gridContainerRef = useRef(null);
  const [layout, setLayout] = useState([]); // Start with an empty layout
  const [counter, setCounter] = useState(0); // Start counter at 0
  const [locked, setLocked] = useState(false);
  const [gridWidth, setGridWidth] = useState(800);
  const [gridItems, setGridItems] = useState({}); // State to store item metadata (name, description, image)
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (gridContainerRef.current) {
      setGridWidth(gridContainerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (gridContainerRef.current) {
        setGridWidth(gridContainerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddGridItem = () => {
    setShowModal(true); // Show modal when Add is pressed
  };

  const addGridItem = () => {
    if (layout.length < 12 && formData.name && formData.image) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;

        const newItem = {
          i: `${counter}`,
          x: (layout.length * 2) % 12,
          y: Math.floor(layout.length / 6),
          w: 2,
          h: 2,
        };

        setLayout((prevLayout) => [...prevLayout, newItem]);
        setGridItems((prevItems) => ({
          ...prevItems,
          [counter]: {
            name: formData.name,
            description: formData.description,
            image: imageUrl,
          },
        }));

        setCounter((prevCounter) => prevCounter + 1);
        setFormData({ name: '', description: '', image: null });
        setShowModal(false); // Close modal
      };
      reader.readAsDataURL(formData.image);
    }
  };

  const popGridItem = () => {
    if (layout.length > 0) {
      const newLayout = layout.slice(0, -1);
      setLayout(newLayout);

      const updatedGridItems = { ...gridItems };
      delete updatedGridItems[`${layout.length - 1}`];
      setGridItems(updatedGridItems);

      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  const toggleLock = () => {
    setLocked(!locked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  // Expose functions to the parent using `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    addGridItem: handleAddGridItem,
    removeGridItem: popGridItem,
    toggleLock,
    isLocked: locked,
  }));
  const handleRemoveItem = (itemId) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== itemId));
    setGridItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[itemId];
      return updatedItems;
    });
  };
  
  return (
    <div ref={gridContainerRef} className="grid-container">
      <GridLayout
        className="layout"
        layout={layout}
        cols={18}
        rowHeight={30}
        width={gridWidth}
        isDraggable={!locked}
        isResizable={!locked}
        margin={[10, 10]}
        containerPadding={[0, 0]}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {layout.map((item) => (
  <div key={item.i} className="grid-item">
    <div className="grid-item-content">
      {gridItems[item.i]?.image && (
        <img
          src={gridItems[item.i].image}
          alt={`Uploaded for item ${item.i}`}
          className="uploaded-image"
        />
      )}
      <button
        className="cancel-button"
        onClick={() => handleRemoveItem(item.i)}
      >
        
      </button>
    </div>
  </div>
))}
      </GridLayout>

      {/* Modal for adding new grid item */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Item</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
      onChange={handleInputChange}
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="modal-buttons">
                <button type="button" onClick={addGridItem} className="button">Add</button>
                <button type="button" onClick={() => setShowModal(false)} className="button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

export default MyGrid;
