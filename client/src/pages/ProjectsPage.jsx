import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../api/projects';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    industry: '',
    page: 1,
    limit: 9
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 9
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetchProjects(filters);
        setProjects(response.data.data || []);
        setPagination({
          total: response.total || 0,
          page: response.page || 1,
          limit: response.limit || 9
        });
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div>
      <h1>Our Projects</h1>

      {/* Filter Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Filter Projects</h3>
        <input
          type="text"
          placeholder="Filter by industry"
          value={filters.industry}
          onChange={(e) => handleFilterChange('industry', e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading && <div>Loading projects...</div>}

      {/* Error State */}
      {error && <div>Error: {error}</div>}

      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <div>No projects found matching your criteria.</div>
      )}

      {/* Projects Grid */}
      {!loading && !error && projects.length > 0 && (
        <>
          <div>
            {projects.map(project => (
              <div key={project._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
                <h2>{project.title}</h2>
                <p>{project.shortDescription}</p>
                <div>
                  <strong>Industry:</strong> {project.industry?.name || 'General'}
                </div>
                <div>
                  <strong>Completion Date:</strong> {new Date(project.completionDate).toLocaleDateString()}
                </div>
                <a href={`/projects/${project.slug}`}>View Case Study →</a>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                Previous
              </button>
              <span> Page {pagination.page} of {totalPages} </span>
              <button 
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;